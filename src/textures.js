const size = 5;

export function drawTexture(id , ctx, x ,y){
 const textures = {
    1: () => { // END OF MAP
      ctx.fillStyle = "#000";
      ctx.fillRect(x * size, y * size, size, size);
    },
    2: () => { // TREE
        ctx.fillStyle = `rgba(87, 62, 0, 1)`; 
        ctx.fillRect(((x * size) - 1), ((y * size) - 3), 6, 8);

        ctx.fillStyle = `rgba(110, 79, 0, 1)`; 
        ctx.fillRect(((x * size) + 2), ((y * size) - 3), 2, 8);

        // leaves
        ctx.fillStyle = `rgba(10, 87, 0, 1)`; 
        ctx.fillRect(((x * size) - 1), ((y * size) - 10), 6, 8);

        ctx.fillStyle = `rgba(14, 122, 0, 1)`; 
        ctx.fillRect(((x * size) - 5), ((y * size) - 5), 6, 5);

        ctx.fillStyle = `rgba(8, 68, 0, 1)`; 
        ctx.fillRect(((x * size) + 4), ((y * size) - 6), 5, 7);

        ctx.fillStyle = `rgba(16, 88, 7, 0.78)`; 
        ctx.fillRect(((x * size) - 4), ((y * size) - 4), 1, 1);

        ctx.fillStyle = `rgba(16, 88, 7, 0.78)`; 
        ctx.fillRect(((x * size) - 3), ((y * size) - 3), 2, 1);
        
        ctx.fillStyle = `rgba(6, 91, 0, 1)`; 
        ctx.fillRect(((x * size) + 5), ((y * size) - 6), 1, 1);

        ctx.fillStyle = `rgba(8, 68, 0, 1)`; 
        ctx.fillRect(((x * size) + 5), ((y * size) - 7), 1, 1);
    }
  };

  if (textures[id]) {
    textures[id]();
  }
}