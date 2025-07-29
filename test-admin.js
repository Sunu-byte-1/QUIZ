// Test de connexion admin
const API_URL = 'https://quiz-zoxq.onrender.com/api';

async function testAdminLogin() {
  console.log('🧪 Test de connexion admin...\n');

  try {
    // Test de connexion admin
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: 'abdallahdiouf.dev@gmail.com',
        password: 'Khoudia1970admin'
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Connexion admin réussie !');
      console.log('📧 Email:', data.user.email);
      console.log('👤 Prénom:', data.user.prenom);
      console.log('👤 Nom:', data.user.nom);
      console.log('🏳️ Pays:', data.user.pays);
      console.log('🎂 Âge:', data.user.age);
      console.log('🛡️ Rôle:', data.user.role);
      console.log('🔑 Token:', data.token.substring(0, 20) + '...');
      
      // Test des routes admin
      if (data.user.role === 'admin') {
        console.log('\n🔐 Test des routes admin...');
        
        // Test récupération utilisateurs
        const usersResponse = await fetch(`${API_URL}/auth/users`, {
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Accept': 'application/json'
          }
        });
        
        if (usersResponse.ok) {
          const usersData = await usersResponse.json();
          console.log('✅ Récupération utilisateurs réussie:', usersData.length, 'utilisateurs');
        } else {
          console.log('❌ Erreur récupération utilisateurs');
        }
        
        // Test statistiques
        const statsResponse = await fetch(`${API_URL}/auth/stats`, {
          headers: {
            'Authorization': `Bearer ${data.token}`,
            'Accept': 'application/json'
          }
        });
        
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          console.log('✅ Statistiques récupérées:', statsData.totalUtilisateurs, 'utilisateurs');
        } else {
          console.log('❌ Erreur récupération statistiques');
        }
      }
      
    } else {
      const errorData = await response.json();
      console.log('❌ Erreur connexion admin:', errorData.message);
    }
  } catch (error) {
    console.log('❌ Erreur test:', error.message);
  }

  console.log('\n🎉 Test terminé !');
}

testAdminLogin(); 