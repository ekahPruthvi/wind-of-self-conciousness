const size = 5;

export function drawTexture(id , ctx, x ,y){
    const xpos = x * size;
    const ypos = y * size;
    const textures = {
        0: () => { // SHADOW
            ctx.fillStyle = "#0000004e";
            ctx.fillRect(xpos - 2 , ypos + 3, 8, 2);

            ctx.fillStyle = "#0000004e";
            ctx.fillRect(xpos - 1 , ypos + 5, 5, 1);
        },
        1: () => { // END OF MAP

            ctx.fillStyle = "#000000ff";
            ctx.fillRect((xpos), (ypos), 5, 5); // pos, pos, thickness, heightye

        },  
        2: () => { // TREE
            // leaves
            ctx.fillStyle = `rgba(57, 118, 0, 1)`; 
            ctx.fillRect((xpos - 4), (ypos - 8), 12, 3);

            ctx.fillStyle = `rgba(43, 90, 0, 1)`; 
            ctx.fillRect((xpos - 5), (ypos - 6), 15, 3);

            ctx.fillStyle = `rgba(57, 118, 0, 1)`; 
            ctx.fillRect((xpos - 4), (ypos - 5), 1, 2);

            ctx.fillStyle = `rgba(43, 90, 0, 1)`; 
            ctx.fillRect((xpos - 6), (ypos - 3), 18, 2);

            ctx.fillStyle = `rgba(28, 58, 0, 1)`; 
            ctx.fillRect((xpos - 2), (ypos - 3), 8, 3);

            // bark
            ctx.fillStyle = `rgba(68, 48, 0, 1)`; 
            ctx.fillRect((xpos + 1), (ypos - 3), 2, 4);

            ctx.fillStyle = `rgba(68, 48, 0, 1)`; 
            ctx.fillRect((xpos), (ypos - 4), 5, 2);

            ctx.fillStyle = `rgba(68, 48, 0, 1)`; 
            ctx.fillRect((xpos + 3), (ypos - 1), 1, 2);

            ctx.fillStyle = `rgba(68, 48, 0, 1)`; 
            ctx.fillRect((xpos), (ypos + 1), size, 1);

            ctx.fillStyle = `rgba(68, 48, 0, 1)`; 
            ctx.fillRect((xpos - 3), (ypos + 2), 10, 1);

            ctx.fillStyle = `rgba(68, 48, 0, 1)`; 
            ctx.fillRect((xpos + 1), (ypos), 2, 4);

            ctx.fillStyle = `rgba(68, 48, 0, 1)`; 
            ctx.fillRect((xpos + 3), (ypos + 4), 1, 1);

            ctx.fillStyle = `rgba(68, 48, 0, 1)`; 
            ctx.fillRect((xpos + 3), (ypos + 4), 1, 1);

            // leaves on bark
            ctx.fillStyle = `rgba(43, 90, 0, 1)`; 
            ctx.fillRect((xpos - 3), (ypos - 5), 5, 3);

            ctx.fillStyle = `rgba(57, 118, 0, 1)`; 
            ctx.fillRect((xpos - 3), (ypos - 4), 1, 1);

            ctx.fillStyle = `rgba(57, 118, 0, 1)`; 
            ctx.fillRect((xpos - 1), (ypos - 6), 3, 1);
        },
        3: () => { // brick wall

            ctx.fillStyle = `rgba(158, 50, 0, 1)`; 
            ctx.fillRect((xpos), (ypos), size, size);
        }
  };

  if (textures[id]) {
    textures[id]();
  }
}