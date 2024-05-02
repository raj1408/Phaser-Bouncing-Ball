import React, { useEffect, useState } from "react";
import Phaser from "phaser";
import ball from "../football-161132_640.png";

function SessionManager() {
  const [sessions, setSessions] = useState([]);
  const [countdown, setCountdown] = useState(0);
  const [ballVelocityX, setBallVelocityX] = useState(0);
  const [ballVelocityY, setBallVelocityY] = useState(0);
  const [gameInstance, setGameInstance] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);

  useEffect(() => {
    function preload() {
      this.load.image("ball", ball);
    }
    function create() {
      const ball = this.physics.add
        .image(400, 300, "ball")
        .setDisplaySize(50, 50);

      ball.setVelocity(
        Phaser.Math.Between(-ballVelocityX, ballVelocityX),
        Phaser.Math.Between(-ballVelocityY, ballVelocityY)
      );

      ball.setBounce(1, 1);
      ball.setCollideWorldBounds(true);

      updateBallVelocity(ball);

      if (gameInstance) {
        gameInstance.destroy(true, true);
      }
    }
    function updateBallVelocity(ball) {
      ball.setVelocity(
        Phaser.Math.Between(-ballVelocityX, ballVelocityX),
        Phaser.Math.Between(-ballVelocityY, ballVelocityY)
      );
    }
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: {
        preload: preload,
        create: create,
      },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
        },
      },
    };
    const newGameInstance = new Phaser.Game(config);
    setGameInstance(newGameInstance);
  }, [ballVelocityX, ballVelocityY]);

  const generateSessionID = () => {
    const id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    return id;
  };

  const generateCountdown = () => {
    const countdown = Math.floor(Math.random() * 120) + 1;
    return countdown;
  };

  const startSession = () => {
    if (isSessionActive) {
      return;
    }
    setIsSessionActive(true);
    const id = generateSessionID();
    const initialCountdown = generateCountdown();
    const startTime = new Date();
    setCountdown(initialCountdown);
    setBallVelocityX(500);
    setBallVelocityY(500);

    const timerInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          clearInterval(timerInterval);
          const endTime = new Date();
          setBallVelocityX(0);
          setBallVelocityY(0);

          console.log(ballVelocityX, ballVelocityY);
          const newSession = {
            id: id,
            startTime: startTime,
            endTime: endTime,
          };
          setSessions((prevSessions) => [...prevSessions, newSession]);
          return 0;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);
  };

  return (
    <div>
      <h1>Session Manager</h1>
      <button onClick={startSession}>Start Session</button>
      <h1>Countdown: {countdown}</h1>
      <div>
        {sessions.map((session) => (
          <h3 key={session.id}>
            Session ID: {session.id}, Start Time:{" "}
            {session.startTime.toLocaleString()}, End Time:{" "}
            {session.endTime.toLocaleString()}
          </h3>
        ))}
      </div>
    </div>
  );
}

export default SessionManager;
