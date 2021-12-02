song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_left_wrist = 0;
score_right_wrist = 0;
song1_status = "";
song2_status = "";

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(450 , 450);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
    console.log("the model is loaded people");
}

function draw()
{
    image(video , 0 , 0 , 450 , 450);
    song1_status =  song1.isPlaying();
    song2_status = song2.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");

    if(score_left_wrist > 0.2)
    {
        circle(leftWristX , leftWristY , 20);
        song1.stop();
    }

    if(song1_status == false)
    {
        song1.play();
        //song.setVolume(1);
        //song.rate(1);
        document.getElementById("song").innerHTML = " song1";
    }

    if(score_right_wrist > 0.2)
    {
        circle(rightWristX , rightWristY , 20);
        song2.stop();
    }

    if(song2_status == false)
    {
        song2.play();
        //song2.setVolume(1);
        //song2.rate(1);
        document.getElementById("song").innerHTML = " song2";
    }
}

function gotPoses(results)
{
   if(results.length > 0)
   {
       console.log(results);
       score_left_wrist = results[0].pose.keypoints[9].score;
       score_right_wrist = results[0].pose.keypoints[10].score;
       console.log("score of the left wrist is " + score_left_wrist + "" + "score of the right wrist is " + score_right_wrist);
       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results[0].pose.leftWrist.y;
       console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);

       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;
       console.log("rigthWristX = " + rightWristX + " rightWristY = " + rightWristY);
   }
}

