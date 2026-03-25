// Función para cargar los datos del perfil
async function loadProfileData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Error al cargar los datos');
        }
        const data = await response.json();
        renderProfile(data);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('fullName').textContent = 'Error al cargar datos';
        document.getElementById('bio').textContent = 'No se pudo cargar la información del perfil. Por favor, recarga la página.';
    }
}

// Función para renderizar el perfil
function renderProfile(data) {
    // Información básica
    document.getElementById('fullName').textContent = data.fullName;
    document.getElementById('age').textContent = `${data.age} años`;
    document.getElementById('email').textContent = data.email;
    document.getElementById('phone').textContent = data.phone;
    document.getElementById('address').textContent = data.address;
    document.getElementById('bio').textContent = data.bio;
    
    // Foto de perfil
    const profileImage = document.getElementById('profileImage');
    profileImage.src = data.profileImage;
    profileImage.alt = `Foto de ${data.fullName}`;
    
    // Habilidades
    const skillsContainer = document.getElementById('skills');
    skillsContainer.innerHTML = '';
    data.skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
    
    // Redes sociales
    const socialContainer = document.getElementById('socialLinks');
    socialContainer.innerHTML = '';
    
    const socialIcons = {
        github: 'fab fa-github',
        linkedin: 'fab fa-linkedin',
        twitter: 'fab fa-twitter',
        instagram: 'fab fa-instagram',
        facebook: 'fab fa-facebook',
        portfolio: 'fas fa-briefcase'
    };
    
    data.socialLinks.forEach(social => {
        const link = document.createElement('a');
        link.href = social.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'social-link';
        
        const icon = document.createElement('i');
        const iconClass = socialIcons[social.platform] || 'fas fa-link';
        icon.className = iconClass;
        
        const text = document.createTextNode(` ${social.platform.charAt(0).toUpperCase() + social.platform.slice(1)}`);
        
        link.appendChild(icon);
        link.appendChild(text);
        socialContainer.appendChild(link);
    });
}

// Cargar los datos cuando la página esté lista
document.addEventListener('DOMContentLoaded', loadProfileData);