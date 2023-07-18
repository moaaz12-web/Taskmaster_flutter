import 'package:flutter/material.dart';
import 'package:velocity_x/velocity_x.dart';

class CommonLogo extends StatefulWidget {
  @override
  _CommonLogoState createState() => _CommonLogoState();
}

class _CommonLogoState extends State<CommonLogo>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: Duration(milliseconds: 500),
    );
    _animation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _animationController, curve: Curves.easeInOut),
    );
    _animationController.repeat(reverse: true);
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        AnimatedBuilder(
          animation: _animationController,
          builder: (context, child) {
            return Transform.scale(
              scale: 1.0 + (_animation.value * 0.1),
              child: Container(
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: Colors.black,
                    width: 4,
                  ),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.5),
                      blurRadius: 8,
                      spreadRadius: 2,
                      offset: Offset(0, 0),
                    ),
                    BoxShadow(
                      color: Colors.black.withOpacity(0.5),
                      blurRadius: 8,
                      spreadRadius: 2,
                      offset: Offset(0, 0),
                    ),
                  ],
                ),
                child: CircleAvatar(
                  backgroundImage: AssetImage(
                    "images/logo.png", // Replace with the path to your asset image
                  ),
                  radius: 80,
                ),
              ),
            );
          },
        ),
        SizedBox(height: 10),
        AnimatedBuilder(
          animation: _animationController,
          builder: (context, child) {
            return Center(
              // opacity: _animation.value,
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: 20),
                child: Text(
                  "TaskMaster",
                  style: TextStyle(
                      fontSize: 24,
                      // fontStyle: FontStyle.italic,
                      color: Colors.black),
                ),
              ),
            );
          },
        ),
        SizedBox(height: 10),
        Text(
          "Make A List of Your Tasks",
          style: TextStyle(
            color: Colors.black,
            fontWeight: FontWeight.w300,
            fontSize: 18,
            letterSpacing: 2.0,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}
