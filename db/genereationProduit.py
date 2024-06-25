import pandas as pd
from faker import Faker
import random
from datetime import datetime, timedelta

# Initialiser Faker
fake = Faker()

# Noms et adresses réels des 5 restaurants
restaurants = [
    ("Le Bernardin", "155 W 51st St, New York, NY 10019, USA"),
    ("Noma", "Refshalevej 96, 1432 København, Denmark"),
    ("Osteria Francescana", "Via Stella, 22, 41121 Modena MO, Italy"),
    ("El Celler de Can Roca", "Carrer de Can Sunyer, 48, 17007 Girona, Spain"),
    ("Mirazur", "30 Av. Aristide Briand, 06500 Menton, France")
]

# Produits possibles et leurs familles
produits_familles = {
    'Pizza': 'fastfood',
    'Burger': 'fastfood',
    'Sushi': 'seafood',
    'Salade': 'healthy',
    'Pasta': 'traditionalfood',
    'Taco': 'fastfood',
    'Sandwich': 'fastfood',
    'Steak': 'traditionalfood',
    'Poulet rôti': 'traditionalfood',
    'Poisson grillé': 'seafood'
}

# Période d'un mois
start_date = datetime.now().replace(day=1)
end_date = start_date + timedelta(days=29)  # Un mois complet

data = []
current_date = start_date
while current_date <= end_date:
    for nom, adresse in restaurants:
        produit = random.choice(list(produits_familles.keys()))
        type_produit = produits_familles[produit]
        chiffre_affaire = round(random.uniform(1000, 10000), 2)  # entre 1000 et 10000
        nombre_commandes = random.randint(50, 300)
        panier_moyen = round(chiffre_affaire / nombre_commandes, 2)

        data.append([
            nom, adresse, current_date.strftime('%Y-%m-%d'), produit, type_produit, 
            chiffre_affaire, nombre_commandes, panier_moyen
        ])
    current_date += timedelta(days=1)

# Créer un DataFrame avec les données
columns = ['Nom', 'Adresse', 'Date', 'Produit', 'TypeProduit', 'Chiffre Affaire', 'Nombre Commandes', 'Panier Moyen']
df = pd.DataFrame(data, columns=columns)

# Sauvegarder le DataFrame dans un fichier CSV
df.to_csv('produit_data.csv', index=False)

print("Le fichier CSV a été généré avec succès.")
