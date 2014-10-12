

class ::MovingObject
  def initialize(position, image_name = self.class.name.downcase, frames = 2, extension = 'png')
    @position = position
    @extension = extension
    @images = 1.upto(frames).map { |i| Image.new("#{image_name}-#{i}.#{extension}") }
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
    x = @position.x+100
    (x-50...x+50).cover? other.position.x
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



class LeoneMangione < Game
  def setup
    @size = display.size
    @horizon = @size.y * 0.75
    @lion = Lion.new(V[@size.x * 0.2, @horizon * 1.05])
    @zebra = new_zebra
    @savannah = Savannah.new(1600)

    @things = [
      @savannah,
      @zebra,
      @lion,
    ]
  end

  def new_zebra
    Zebra.new(V[@size.x * 1.2, @horizon])
  end

  def update(elapsed)
    if keyboard.pressed?(:ctrl)
      @lion.should_roar = true

      if @lion.can_eat?(@zebra)
        @things.delete @zebra
        @zebra = new_zebra
        @things << @zebra
      end
    end

    @things.each do |thing|
      thing.update(elapsed)
      thing.draw(display)
    end
  end
end
