

class ::MovingObject
  def initialize(position, image_name = self.class.name.downcase, frames = 2)
    @position = position
    @images = 1.upto(frames).map { |i| Image.new("#{image_name}-#{i}.png") }
    @image = @image1
    @elapsed = 0
  end
  attr_reader :position

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
    d.image(@image, V[0,0])

    d.pop
  end
end

class Lion < MovingObject
  attr_accessor :should_roar

  def roar
    (@roar ||= Sound.new('lion-roar.mp3')).play
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
    x = @position.x+100
    (x-30...x+30).cover? other.position.x
  end
end

class Zebra < MovingObject
  def update(elapsed)
    @position.x += -(elapsed * 300)
    super
  end

  def draw(d)
    super
    @position.x %= (d.size.x * 1.5)
  end
end

class Savannah < MovingObject
  def update(elapsed)
    @position.x += -(elapsed * 50)
    super
  end

  def draw(d)
    @position.x = 0 if @position.x < -d.size.x
    super
  end
end



class LeoneMangione < Game
  def setup
    @size = display.size
    @horizon = @size.y * 0.75
    @lion = Lion.new(V[@size.x * 0.2, @horizon * 1.05])
    @zebra = new_zebra
    @savannah = Savannah.new(V[0,0], 'savannah', 1)
    @savannahB = Savannah.new(V[@size.x, 0], 'savannah', 1)

    @things = [
      @savannah,
      @savannahB,
      @zebra,
      @lion,
    ]
  end

  def new_zebra
    Zebra.new(V[@size.x * 1.2, @horizon])
  end

  def update(elapsed)
    if @lion.can_eat?(@zebra)
      @lion.should_roar = true
      @things.delete @zebra
      @zebra = new_zebra
      @things << @zebra
    end

    @things.each do |thing|
      thing.update(elapsed)
      thing.draw(display)
    end
  end
end
