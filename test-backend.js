// Script de test pour le backend
const API_URL = 'https://quiz-zoxq.onrender.com/api';

async function testBackend() {
  console.log('🧪 Test du backend...\n');

  // Test 1: API de base
  try {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();
    console.log('✅ API de base:', data.message);
  } catch (error) {
    console.log('❌ Erreur API de base:', error.message);
  }

  // Test 2: Connexion admin
  try {
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
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

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      console.log('✅ Connexion admin réussie');
      
      // Test 3: Récupération des utilisateurs (admin)
      const usersResponse = await fetch(`${API_URL}/auth/users`, {
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Accept': 'application/json'
        }
      });

      if (usersResponse.ok) {
        const usersData = await usersResponse.json();
        console.log(`✅ Récupération utilisateurs: ${usersData.length} utilisateurs`);
      } else {
        console.log('❌ Erreur récupération utilisateurs');
      }

      // Test 4: Statistiques (admin)
      const statsResponse = await fetch(`${API_URL}/auth/stats`, {
        headers: {
          'Authorization': `Bearer ${loginData.token}`,
          'Accept': 'application/json'
        }
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        console.log('✅ Statistiques récupérées:', statsData.totalUtilisateurs, 'utilisateurs');
      } else {
        console.log('❌ Erreur récupération statistiques');
      }

    } else {
      const errorData = await loginResponse.json();
      console.log('❌ Erreur connexion admin:', errorData.message);
    }
  } catch (error) {
    console.log('❌ Erreur test connexion:', error.message);
  }

  console.log('\n🎉 Tests terminés !');
}

testBackend(); 