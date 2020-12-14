module.exports = {
    ensureAuthenticated: function(req, res, next) {  //se asigura ca sunt auth, daca da imi da next
      if (req.isAuthenticated()) {
        return next();
      }
      //req.flash('error_msg', 'Please log in to view that resource');
     //res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) { //daca nu e auth, imi da next
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');      
    }
  };