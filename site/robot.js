// Init
if (!robot.memory.initialized) {
  robot.memory.initialized = true;
  robot.memory.timer = 40;
  robot.memory.mode = -2; //-2 : initialized1, -1 : initialized2 , 0: go ahead, 1: turn right, 2: turn left, 3:check wall beside 
  robot.memory.wallthreshold = 40;
  robot.memory.goAheadTime = 25;
  robot.memory.turnTime = 7;
}

function goAhead() {
    robot.setMotors(1.5, 1.5);
}

function turnRight() {
    robot.setMotors(-1, 1);
}

function turnLeft() {
    robot.setMotors(1, -1);
}


if (robot.memory.timer == 0 && robot.memory.mode == 0)
{
    robot.log("turning right"+robot.sensors.dist);
    if (robot.sensors.dist < robot.memory.wallthreshold)
    {
        turnRight();
        robot.memory.timer = robot.memory.turnTime;
        robot.memory.mode = 1;
        robot.log("turning right");
    }
    else
    {
        turnLeft();
        robot.memory.timer = robot.memory.turnTime;
        robot.memory.mode = 3;
        robot.log("checking wall beside");
    }
}
else
{
    if (robot.memory.mode == -2)
    {
        goAhead();
        if(robot.memory.timer == 1)
        {
            robot.memory.mode = -1;
            robot.memory.timer = 15;
        }
    }
     if (robot.memory.mode == -1)
    {
        robot.setMotors(-0.4, 0.4);
        if(robot.memory.timer == 1)
        {
            robot.memory.mode = 0;
            robot.memory.timer = robot.memory.goAheadTime;
        }
    }

    if (robot.memory.mode == 0)
    {
        goAhead();
    }
    else if (robot.memory.mode == 1)
    {
        turnRight();
        if(robot.memory.timer == 1)
        {
            robot.memory.mode = 0;
            robot.memory.timer = robot.memory.goAheadTime;
        }
    }
    else if (robot.memory.mode == 2)
    {
        turnLeft();
        if(robot.memory.timer == 1)
        {
            robot.memory.mode = 0;
            robot.memory.timer = robot.memory.goAheadTime;
        }
    }
    else if (robot.memory.mode == 3)
    {
        turnLeft();
        if (robot.memory.timer == 1)
        {
        
            turnLeft();
            if (robot.sensors.dist < robot.memory.wallthreshold)
            {
                turnRight();
                robot.memory.mode = 1;
                robot.memory.timer = robot.memory.turnTime;
                robot.log("checking wall beside : turning right");
            }
            else
            {
                
                robot.memory.mode = 0;
                robot.memory.timer = robot.memory.goAheadTime;
                robot.log("checking wall beside : go ahead");
            }

        }
        
    }
    robot.memory.timer--;
}




