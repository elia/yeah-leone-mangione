/* Generated by Opal 0.7.0.dev */
Opal.modules["pp"] = function($opal) {
  $opal.dynamic_require_severity = "error";
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module;

  $opal.add_stubs(['$inspect', '$each', '$<=', '$length', '$[]']);
  return (function($base) {
    var self = $module($base, 'Kernel');

    var def = self.$$proto, $scope = self.$$scope, $a;

    def.$pretty_inspect = function() {
      var self = this;

      return self.$inspect();
    };

    if ((($a = (typeof console === "undefined" || typeof console.log === "undefined")) !== nil && (!$a.$$is_boolean || $a == true))) {
      $opal.defn(self, '$pp', def.$p)
      } else {
      def.$pp = function(args) {
        var $a, $b, TMP_1, self = this;

        args = $slice.call(arguments, 0);
        ($a = ($b = args).$each, $a.$$p = (TMP_1 = function(obj){var self = TMP_1.$$s || this;
if (obj == null) obj = nil;
        console.log(obj);}, TMP_1.$$s = self, TMP_1), $a).call($b);
        if (args.$length()['$<='](1)) {
          return args['$[]'](0)
          } else {
          return args
        };
      }
    };
        ;$opal.donate(self, ["$pretty_inspect", "$pp", "$pp"]);
  })(self)
};

/* Generated by Opal 0.7.0.dev */
(function($opal) {
  $opal.dynamic_require_severity = "error";
  var self = $opal.top, $scope = $opal, nil = $opal.nil, $breaker = $opal.breaker, $slice = $opal.slice, $module = $opal.module, $klass = $opal.klass, $range = $opal.range;

  $opal.add_stubs(['$require', '$map', '$new', '$upto', '$downcase', '$name', '$class', '$attr_reader', '$+', '$>=', '$-', '$size', '$[]', '$to_i', '$*', '$push', '$translate', '$/', '$-@', '$width', '$image', '$pop', '$attr_accessor', '$play', '$should_roar', '$roar', '$should_roar=', '$in_eat_range?', '$===', '$x', '$cover?', '$position', '$include', '$x=', '$to_f', '$cycle', '$<=', '$fill_color=', '$text_font=', '$text_size=', '$fill_text', '$to_s', '$display', '$y', '$new_prey', '$sort_things!', '$fill_color', '$!', '$new_zebra', '$new_elephant', '$sort_by', '$to_proc', '$draw', '$delete', '$<<', '$pressed?', '$keyboard', '$pressing?', '$can_eat?', '$replace_prey!', '$score!', '$p', '$game_over!', '$<', '$each', '$update']);
  self.$require("pp");
  (function($base) {
    var self = $module($base, 'Prey');

    var def = self.$$proto, $scope = self.$$scope;

    nil
    
  })(self);
  (function($base, $super) {
    function $MovingObject(){};
    var self = $MovingObject = $klass($base, $super, 'MovingObject', $MovingObject);

    var def = self.$$proto, $scope = self.$$scope;

    def.image1 = def.elapsed = def.images = def.position = def.image = nil;
    def.$initialize = function(position, image_name, frames, extension) {
      var $a, $b, TMP_1, self = this;

      if (image_name == null) {
        image_name = self.$class().$name().$downcase()
      }
      if (frames == null) {
        frames = 2
      }
      if (extension == null) {
        extension = "png"
      }
      self.position = position;
      self.extension = extension;
      self.images = ($a = ($b = (1).$upto(frames)).$map, $a.$$p = (TMP_1 = function(i){var self = TMP_1.$$s || this;
if (i == null) i = nil;
      return $scope.get('Image').$new("" + (image_name) + "-" + (i) + "." + (extension))}, TMP_1.$$s = self, TMP_1), $a).call($b);
      self.image = self.image1;
      return self.elapsed = 0;
    };

    self.$attr_reader("position");

    def.$z = function() {
      var self = this;

      return 0;
    };

    def.$update = function(elapsed) {
      var self = this;

      self.elapsed = self.elapsed['$+'](elapsed);
      if (self.elapsed['$>='](self.images.$size()['$-'](1))) {
        self.elapsed = 0};
      return self.image = self.images['$[]']((self.elapsed['$*'](self.images.$size())).$to_i());
    };

    return (def.$draw = function(d) {
      var self = this, x = nil;

      d.$push();
      d.$translate(self.position);
      x = (self.image.$width()['$-@']()['$/'](2));
      d.$image(self.image, $scope.get('V')['$[]'](x, 0));
      return d.$pop();
    }, nil) && 'draw';
  })($opal.Object, null);
  (function($base, $super) {
    function $Lion(){};
    var self = $Lion = $klass($base, $super, 'Lion', $Lion);

    var def = self.$$proto, $scope = self.$$scope, TMP_2, TMP_3;

    def.position = nil;
    self.$attr_accessor("should_roar");

    $opal.cdecl($scope, 'ROAR', $scope.get('Sound').$new("lion-roar.mp3"));

    def.$roar = function() {
      var self = this;

      return $scope.get('ROAR').$play();
    };

    def.$draw = TMP_2 = function(d) {var $zuper = $slice.call(arguments, 0);
      var self = this, $iter = TMP_2.$$p, $yield = $iter || nil;

      TMP_2.$$p = null;
      return $opal.find_super_dispatcher(self, 'draw', TMP_2, $iter).apply(self, $zuper);
    };

    def.$update = TMP_3 = function(elapsed) {var $zuper = $slice.call(arguments, 0);
      var $a, $b, self = this, $iter = TMP_3.$$p, $yield = $iter || nil;

      TMP_3.$$p = null;
      if ((($a = self.$should_roar()) !== nil && (!$a.$$is_boolean || $a == true))) {
        self.$roar();
        (($a = [false]), $b = self, $b['$should_roar='].apply($b, $a), $a[$a.length-1]);};
      return $opal.find_super_dispatcher(self, 'update', TMP_3, $iter).apply(self, $zuper);
    };

    def['$can_eat?'] = function(other) {
      var $a, self = this;

      return ($a = self['$in_eat_range?'](other), $a !== false && $a !== nil ?$scope.get('Prey')['$==='](other) : $a);
    };

    return (def['$in_eat_range?'] = function(other) {
      var self = this, x = nil;

      x = self.position.$x()['$+'](100);
      return ($range(x['$-'](50), x['$+'](50), true))['$cover?'](other.$position().$x());
    }, nil) && 'in_eat_range?';
  })(self, $scope.get('MovingObject'));
  (function($base, $super) {
    function $Zebra(){};
    var self = $Zebra = $klass($base, $super, 'Zebra', $Zebra);

    var def = self.$$proto, $scope = self.$$scope, TMP_4;

    def.position = nil;
    self.$include($scope.get('Prey'));

    return (def.$update = TMP_4 = function(elapsed) {var $zuper = $slice.call(arguments, 0);
      var $a, self = this, $iter = TMP_4.$$p, $yield = $iter || nil;

      TMP_4.$$p = null;
      ($a = self.position, $a['$x=']($a.$x()['$+']((elapsed['$*'](300))['$-@']())));
      return $opal.find_super_dispatcher(self, 'update', TMP_4, $iter).apply(self, $zuper);
    }, nil) && 'update';
  })(self, $scope.get('MovingObject'));
  (function($base, $super) {
    function $Elephant(){};
    var self = $Elephant = $klass($base, $super, 'Elephant', $Elephant);

    var def = self.$$proto, $scope = self.$$scope, TMP_5;

    def.position = nil;
    def.$z = function() {
      var self = this;

      return 10;
    };

    return (def.$update = TMP_5 = function(elapsed) {var $zuper = $slice.call(arguments, 0);
      var $a, self = this, $iter = TMP_5.$$p, $yield = $iter || nil;

      TMP_5.$$p = null;
      ($a = self.position, $a['$x=']($a.$x()['$+']((elapsed['$*'](300))['$-@']())));
      return $opal.find_super_dispatcher(self, 'update', TMP_5, $iter).apply(self, $zuper);
    }, nil) && 'update';
  })(self, $scope.get('MovingObject'));
  (function($base, $super) {
    function $Savannah(){};
    var self = $Savannah = $klass($base, $super, 'Savannah', $Savannah);

    var def = self.$$proto, $scope = self.$$scope;

    def.image1 = def.speed = def.position1 = def.position2 = def.width = def.elapsed = def.image2 = nil;
    def.$initialize = function(width, image_name) {
      var self = this;

      if (image_name == null) {
        image_name = self.$class().$name().$downcase()['$+'](".jpg")
      }
      self.width = width;
      self.position1 = $scope.get('V')['$[]'](0, 0);
      self.position2 = $scope.get('V')['$[]'](width, 0);
      self.image1 = $scope.get('Image').$new("" + (image_name));
      self.image2 = self.image1;
      self.elapsed = 0;
      return self.speed = 80;
    };

    self.$attr_reader("position");

    def.$z = function() {
      var self = this;

      return -1;
    };

    def.$update = function(elapsed) {
      var $a, $b, self = this, delta = nil, delta1 = nil, delta2 = nil;

      delta = (elapsed['$*'](self.speed));
      delta1 = self.position1.$x().$to_f()['$-'](delta);
      delta2 = self.position2.$x().$to_f()['$-'](delta);
      (($a = [delta1]), $b = self.position1, $b['$x='].apply($b, $a), $a[$a.length-1]);
      (($a = [delta2]), $b = self.position2, $b['$x='].apply($b, $a), $a[$a.length-1]);
      self.$cycle(self.position1, self.position2, self.width);
      self.$cycle(self.position2, self.position1, self.width);
      return self.elapsed = self.elapsed['$+'](elapsed);
    };

    def.$cycle = function(image, other_image, width) {
      var $a, $b, self = this;

      if ((image.$x()['$+'](width))['$<='](0)) {
        return (($a = [other_image.$x()['$+'](width)]), $b = image, $b['$x='].apply($b, $a), $a[$a.length-1])
        } else {
        return nil
      };
    };

    return (def.$draw = function(d) {
      var self = this, image = nil, position = nil;

      image = self.image1;
      position = self.position1;
      d.$push();
      d.$translate(position);
      d.$image(image, $scope.get('V')['$[]'](0, 0));
      d.$pop();
      image = self.image2;
      position = self.position2;
      d.$push();
      d.$translate(position);
      d.$image(image, $scope.get('V')['$[]'](0, 0));
      return d.$pop();
    }, nil) && 'draw';
  })(self, null);
  (function($base, $super) {
    function $Score(){};
    var self = $Score = $klass($base, $super, 'Score', $Score);

    var def = self.$$proto, $scope = self.$$scope;

    def.score = def.position = nil;
    def.$initialize = function(position) {
      var self = this;

      if (position == null) {
        position = $scope.get('V')['$[]'](0, 0)
      }
      self.position = position;
      return self.score = 0;
    };

    def['$score!'] = function() {
      var self = this;

      return self.score = self.score['$+'](1);
    };

    def.$z = function() {
      var self = this;

      return 0;
    };

    def.$update = function(elapsed) {
      var self = this;

      return nil;
    };

    return (def.$draw = function(d) {
      var $a, $b, self = this;

      d.$push();
      (($a = [$scope.get('C')['$[]']("#ffffff")]), $b = d, $b['$fill_color='].apply($b, $a), $a[$a.length-1]);
      (($a = [$scope.get('Font')['$[]']("deja-vu-serif.ttf")]), $b = d, $b['$text_font='].apply($b, $a), $a[$a.length-1]);
      (($a = [32]), $b = d, $b['$text_size='].apply($b, $a), $a[$a.length-1]);
      d.$fill_text(self.score.$to_s(), self.position);
      return d.$pop();
    }, nil) && 'draw';
  })(self, null);
  (function($base, $super) {
    function $Text(){};
    var self = $Text = $klass($base, $super, 'Text', $Text);

    var def = self.$$proto, $scope = self.$$scope;

    return ($opal.defs(self, '$draw', function(d, position, text) {
      var $a, $b, self = this;

      d.$push();
      (($a = [$scope.get('C')['$[]']("#ffffff")]), $b = d, $b['$fill_color='].apply($b, $a), $a[$a.length-1]);
      (($a = [$scope.get('Font')['$[]']("deja-vu-serif.ttf")]), $b = d, $b['$text_font='].apply($b, $a), $a[$a.length-1]);
      (($a = [32]), $b = d, $b['$text_size='].apply($b, $a), $a[$a.length-1]);
      d.$fill_text(text, position);
      return d.$pop();
    }), nil) && 'draw'
  })(self, null);
  return (function($base, $super) {
    function $LeoneMangione(){};
    var self = $LeoneMangione = $klass($base, $super, 'LeoneMangione', $LeoneMangione);

    var def = self.$$proto, $scope = self.$$scope;

    def.size = def.horizon = def.savannah = def.prey = def.lion = def.score = def.rand = def.things = def.game_over = def.pause = def.pause_position = nil;
    def.$setup = function() {
      var $a, $b, self = this;

      self.size = self.$display().$size();
      self.horizon = self.size.$y()['$*'](0.75);
      self.lion = $scope.get('Lion').$new($scope.get('V')['$[]'](self.size.$x()['$*'](0.2), self.horizon['$*'](1.05)));
      self.prey = self.$new_prey();
      self.savannah = $scope.get('Savannah').$new(1600);
      self.score = $scope.get('Score').$new($scope.get('V')['$[]'](self.size.$x()['$*'](0.8), 100));
      self.things = [self.savannah, self.prey, self.lion, self.score];
      self['$sort_things!']();
      (($a = [$scope.get('Font')['$[]']("deja-vu-serif.ttf")]), $b = self.$display(), $b['$text_font='].apply($b, $a), $a[$a.length-1]);
      (($a = [16]), $b = self.$display(), $b['$text_size='].apply($b, $a), $a[$a.length-1]);
      return self.$display().$fill_color($scope.get('C')['$[]']("#fff"));
    };

    def.$new_zebra = function() {
      var self = this;

      return $scope.get('Zebra').$new($scope.get('V')['$[]'](self.size.$x()['$*'](1.2), self.horizon));
    };

    def.$new_elephant = function() {
      var self = this;

      return $scope.get('Elephant').$new($scope.get('V')['$[]'](self.size.$x()['$+'](300), self.horizon['$*'](0.7)));
    };

    def.$new_prey = function() {
      var $a, self = this;

      self.rand = self.rand['$!']();
      if ((($a = self.rand) !== nil && (!$a.$$is_boolean || $a == true))) {
        return self.$new_zebra()
        } else {
        return self.$new_elephant()
      };
    };

    def['$sort_things!'] = function() {
      var $a, $b, self = this;

      return self.thigs = ($a = ($b = self.things).$sort_by, $a.$$p = "z".$to_proc(), $a).call($b);
    };

    def['$game_over!'] = function() {
      var self = this;

      self.game_over = true;
      $scope.get('Text').$draw(self.$display(), $scope.get('V')['$[]'](self.size.$x()['$*'](0.41), 350), "GAME OVER");
      return $scope.get('Text').$draw(self.$display(), $scope.get('V')['$[]'](self.size.$x()['$*'](0.34), 250), "you tried to eat an elephant!");
    };

    def['$replace_prey!'] = function() {
      var self = this;

      self.things.$delete(self.prey);
      self.prey = self.$new_prey();
      return self.things['$<<'](self.prey);
    };

    return (def.$update = function(elapsed) {
      var $a, $b, $c, TMP_6, self = this;

      if ((($a = self.game_over) !== nil && (!$a.$$is_boolean || $a == true))) {
        return nil};
      if ((($a = self.$keyboard()['$pressed?']("p")) !== nil && (!$a.$$is_boolean || $a == true))) {
        self.pause = self.pause['$!']();
        if ((($a = self.pause) !== nil && (!$a.$$is_boolean || $a == true))) {
          ((($a = self.pause_position) !== false && $a !== nil) ? $a : self.pause_position = $scope.get('V')['$[]'](self.size.$x()['$*'](0.2), 100));
          $scope.get('Text').$draw(self.$display(), self.pause_position, "Paused");};};
      if ((($a = self.pause) !== nil && (!$a.$$is_boolean || $a == true))) {
        return nil};
      if ((($a = self.$keyboard()['$pressed?']("ctrl")) !== nil && (!$a.$$is_boolean || $a == true))) {
        (($a = [true]), $b = self.lion, $b['$should_roar='].apply($b, $a), $a[$a.length-1])};
      if ((($a = self.$keyboard()['$pressing?']("ctrl")) !== nil && (!$a.$$is_boolean || $a == true))) {
        if ((($a = self.lion['$can_eat?'](self.prey)) !== nil && (!$a.$$is_boolean || $a == true))) {
          self['$replace_prey!']();
          self.score['$score!']();
          self['$sort_things!']();
          self.$p(($a = ($b = self.things).$map, $a.$$p = "class".$to_proc(), $a).call($b));
        } else if ((($a = self.lion['$in_eat_range?'](self.prey)) !== nil && (!$a.$$is_boolean || $a == true))) {
          self['$game_over!']();
          return nil;}};
      self.$p(self.prey.$position().$x());
      if (self.prey.$position().$x()['$<'](-200)) {
        self['$replace_prey!']()};
      return ($a = ($c = self.things).$each, $a.$$p = (TMP_6 = function(thing){var self = TMP_6.$$s || this;
if (thing == null) thing = nil;
      thing.$update(elapsed);
        return thing.$draw(self.$display());}, TMP_6.$$s = self, TMP_6), $a).call($c);
    }, nil) && 'update';
  })(self, $scope.get('Game'));
})(Opal);

//# sourceMappingURL=game.map
;
