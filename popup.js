// Função para exibir notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Estilos para a notificação
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: #0a0a1f;
            font-weight: bold;
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .notification.success {
            background: linear-gradient(45deg, #00ffc8, #00b894);
        }
        .notification.error {
            background: linear-gradient(45deg, #ff6b6b, #ee5253);
        }
        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);
    
    // Remover notificação após 3 segundos
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
}

// Salvar configurações automaticamente
function saveConfig() {
    const config = {
        nextQuestionDelay: document.getElementById('nextQuestionDelay').value,
        alternativeDelay: document.getElementById('alternativeDelay').value,
        videoDelay: document.getElementById('videoDelay').value,
        retryDelay: document.getElementById('retryDelay').value
    };
    chrome.storage.local.set({ config }, () => {
        showNotification('Configurações salvas com sucesso!');
    });
}

// Adicionar listeners para salvar automaticamente
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('change', saveConfig);
});

// Modificar o botão de salvar para apenas notificar
document.getElementById('saveConfig').addEventListener('click', () => {
    showNotification('Configurações já estão salvas automaticamente!');
});
