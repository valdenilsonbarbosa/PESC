const ferro = document.getElementById("ferro");

ferro.addEventListener("dragstart", (e) => {
    // Armazena a posição inicial do mouse
    const offsetX = e.clientX - ferro.getBoundingClientRect().left;
    const offsetY = e.clientY - ferro.getBoundingClientRect().top;

    // Define o comportamento durante o arraste
    ferro.style.position = "absolute";
    ferro.style.zIndex = 1000; // Coloca a imagem na frente de outros elementos

    // Função de arraste
    const moveImage = (moveEvent) => {
        ferro.style.left = `${moveEvent.clientX - offsetX}px`;
        ferro.style.top = `${moveEvent.clientY - offsetY}px`;
    };

    // Função para parar o arraste
    const stopDrag = () => {
        document.removeEventListener("mousemove", moveImage);
        document.removeEventListener("mouseup", stopDrag);
    };

    // Adiciona os ouvintes de evento para mover a imagem
    document.addEventListener("mousemove", moveImage);
    document.addEventListener("mouseup", stopDrag);
});
