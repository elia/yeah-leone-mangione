require 'pp'

module Prey
end

class ::MovingObject
  def initialize(position, image_name = self.class.name.downcase, frames = 2, extension = 'png')
    @position = position
    @extension = extension
    @images = 1.upto(frames).map { |i| Image.new("#{image_name}-#{i}.#{extension}") }
    @image = @image1
    @elapsed = 0
  end
  attr_reader :position

  def z
    0
  end

  def update(elapsed)
    @elapsed += elapsed
    @elapsed = 0 if @elapsed >= @images.size-1
    @image = @images[(@elapsed*@images.size).to_i]
  end

  def draw(d)
    d.push

    # Move "pen" by position.
    d.translate @position

    # Draw the eyes part of image, centered on pen.
    x = (-@image.width/2)
    d.image(@image, V[x,0])

    d.pop
  end
end

class Lion < MovingObject
  attr_accessor :should_roar
  ROAR = Sound.new('lion-roar.mp3')

  def roar
    ROAR.play
  end

  def draw(d)
    super
  end

  def update(elapsed)
    if should_roar
      roar
      self.should_roar = false
    end
    super
  end

  def can_eat?(other)
    in_eat_range?(other) and
      Prey === other
  end

  def in_eat_range?(other)
    x = @position.x+100
    (x-50...x+50).cover? other.position.x
  end
end

class Zebra < MovingObject
  include Prey

  def update(elapsed)
    @position.x += -(elapsed * 300)
    super
  end
end

class Elephant < MovingObject
  def z
    10
  end

  def update(elapsed)
    @position.x += -(elapsed * 300)
    super
  end
end

class Savannah
  def initialize(width, image_name = self.class.name.downcase+'.jpg')
    @width = width
    @position1 = V[0,0]
    @position2 = V[width,0]
    @image1 = Image.new("#{image_name}")
    @image2 = @image1
    @elapsed = 0
    @speed = 80
  end
  attr_reader :position

  def z
    -1
  end

  def update(elapsed)
    delta = (elapsed * @speed)
    delta1 = @position1.x.to_f - delta
    delta2 = @position2.x.to_f - delta
    @position1.x = delta1
    @position2.x = delta2
    cycle(@position1, @position2, @width)
    cycle(@position2, @position1, @width)
    @elapsed += elapsed
  end

  def cycle(image, other_image, width)
    image.x = other_image.x + width if (image.x + width) <= 0
  end

  def draw(d)
    image = @image1
    position = @position1
    d.push
    d.translate(position)  # Move "pen" by position.
    d.image(image, V[0,0]) # Draw the eyes part of image, centered on pen.
    d.pop

    image = @image2
    position = @position2
    d.push
    d.translate(position)  # Move "pen" by position.
    d.image(image, V[0,0]) # Draw the eyes part of image, centered on pen.
    d.pop
  end
end

class Score
  def initialize(position = V[0,0])
    @position = position
    @score = 0
  end

  def score!
    @score += 1
  end

  def z
    0
  end

  def update(elapsed)
  end

  def draw(d)
    d.push
    d.fill_color = C['#ffffff']
    d.text_font = Font['deja-vu-serif.ttf']
    d.text_size = 32
    d.fill_text(@score.to_s, @position)
    d.pop
  end
end

class Text
  def self.draw(d, position, text)
    d.push
    d.fill_color = C['#ffffff']
    d.text_font = Font['deja-vu-serif.ttf']
    d.text_size = 32
    d.fill_text(text, position)
    d.pop
  end
end


class LeoneMangione < Game
  def setup
    @size     = display.size
    @horizon  = @size.y * 0.75
    @lion     = Lion.new(V[@size.x * 0.2, @horizon * 1.05])
    @prey     = new_prey
    @savannah = Savannah.new(1600)
    @score    = Score.new(V[@size.x * 0.8, 100])

    listen_to_touch_events

    @things = [
      @savannah,
      @prey,
      @lion,
      @score,
    ]
    sort_things!

    # setup text style
    display.text_font = Font['deja-vu-serif.ttf']
    # display.text_font = Font['Comic Sans']
    display.text_size = 16
    display.fill_color(C['#fff'])
  end

  def listen_to_touch_events
    %x{
      document.body.addEventListener('touchstart',  function(e){#{@touch_status = :touchstart }}, false)
      document.body.addEventListener('touchend',    function(e){#{@touch_status = :touchend   }}, false)
      document.body.addEventListener('touchcancel', function(e){#{@touch_status = :touchcancel}}, false)
    }
  end

  def touched?

  end

  def touching?
    if @touch_status == :touchstart
      @touch_status = nil
      true
    end
  end

  def touched?
    if @touch_status == :touchend or @touch_status == :touchcancel
      @touch_status = nil
      true
    end
  end

  def new_zebra
    Zebra.new(V[@size.x * 1.2, @horizon])
  end

  def new_elephant
    Elephant.new(V[@size.x + 300, @horizon * 0.7])
  end

  def new_prey
    # rand > 0.5 ? new_zebra : new_elephant
    @rand = !@rand
    @rand ? new_zebra : new_elephant
  end

  def sort_things!
    @thigs = @things.sort_by(&:z)
  end

  def game_over!
    @game_over = true
    Text.draw(display, V[@size.x * 0.41, 350], 'GAME OVER')
    Text.draw(display, V[@size.x * 0.34, 250], 'you tried to eat an elephant!')
  end

  def replace_prey!
    @things.delete @prey
    @prey = new_prey
    @things << @prey
  end

  def update(elapsed)
    if @game_over
      return
    end

    if keyboard.pressed?(:p)
      @pause = !@pause
      if @pause
        @pause_position ||= V[@size.x * 0.2, 100]
        Text.draw(display, @pause_position, 'Paused')
      end
    end
    return if @pause

    if keyboard.pressed?(:ctrl) or touched?
      @lion.should_roar = true
    end

    if keyboard.pressing?(:ctrl) or touching?
      if @lion.can_eat?(@prey)
        replace_prey!
        @score.score!
        sort_things!
      elsif @lion.in_eat_range?(@prey)
        game_over!
        return
      end
    end

    replace_prey! if @prey.position.x < -200

    @things.each do |thing|
      thing.update(elapsed)
      thing.draw(display)
    end
  end
end
