class LeoneMangione < Game
  def setup
    size = display.size
    @horizon = size.y * 0.8
    @lion = Lion.new(V[size.x * 0.2, horizon])
    @zebra = Zebra.new(V[size.x * 0.8, horizon])
    @bg = Image.new('bg.png')
    @animals = [
      @lion,
      @zebra,
    ]
    draw_bg(display)
  end

  def update(elapsed)
    @animals.each do |animal|
      animal.update(elapsed)
      animal.draw(display)
    end
  end

  def draw_bg(d)
    d.push
    d.scale(V[1.5,1.5])
    d.image(@bg, V[0,-200])
    d.pop
  end
end


class Lion
  def initialize(position)
    @position = position
    @images = [
      Image.new('lion-1.png'),
      Image.new('lion-2.png'),
    ]
    @image = @image1
    @elapsed = 0
  end

  def update(elapsed)
    @elapsed += elapsed
    @elapsed = 0 if @elapsed >= 1
    @image = @images[(@elapsed*2).to_i]
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

class Zebra
  def initialize(position)
    @position = position
    @images = [
      Image.new('zebra-1.png'),
      Image.new('zebra-2.png'),
    ]
    @image = @image1
    @elapsed = 0
  end

  def update(elapsed)
    @elapsed += elapsed
    @elapsed = 0 if @elapsed >= 1
    @image = @images[(@elapsed*2).to_i]
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

