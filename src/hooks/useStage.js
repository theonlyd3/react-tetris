import { useState, useEffect } from "react";
import { createStage } from "../gameHelpers";

export const useStage = (player, resetplayer) => {
  const [stage, setStage] = useState(createStage());

  useEffect(() => {
    const updateStage = prevStage => {
      // First flush the stage

      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === "clear" ? [0, "clear"] : cell))
      );

      // Then draw the tetromino
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newStage[y + player.pos.y][x + player.pos.x] = [
              value,
              `${player.collied ? "merged" : "cleared"}`
            ];
          }
        });
      });
    };

    setStage(prev => updateStage(prev));
  }, [player.collided, player.pos.x, player.pos.y, player.teromino]);

  return [stage, setStage];
};