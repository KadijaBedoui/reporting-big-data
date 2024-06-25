import pandas as pd
from faker import Faker
import random
from datetime import datetime, timedelta

# Initialiser Faker
fake = Faker()
restaurants = [
    ("Le Bernardin", "155 W 51st St, New York, NY 10019, USA"),
    ("Noma", "Refshalevej 96, 1432 København, Denmark"),
    ("Osteria Francescana", "Via Stella, 22, 41121 Modena MO, Italy"),
    ("El Celler de Can Roca", "Carrer de Can Sunyer, 48, 17007 Girona, Spain"),
    ("Mirazur", "30 Av. Aristide Briand, 06500 Menton, France")
]

supports_de_vente = ['POS', 'Kiosk', 'Application C&C']
start_date = datetime.now().replace(day=1)
end_date = start_date + timedelta(days=29)  # Un mois complet

data = []
current_date = start_date
while current_date <= end_date:
    for nom, adresse in restaurants:
        chiffre_affaire = round(random.uniform(1000, 10000), 2)  # entre 1000 et 10000
        nb_commandes = random.randint(50, 300)
        panier_moyen = round(chiffre_affaire / nb_commandes, 2)
        support_de_vente = random.choice(supports_de_vente)
        
        data.append([nom, adresse, current_date.strftime('%Y-%m-%d'), chiffre_affaire, nb_commandes, support_de_vente, panier_moyen])
    current_date += timedelta(days=1)

columns = ['Nom', 'Adresse', 'Date', 'ChiffreAffaire', 'NbCommandes', 'Support de Vente', 'Panier Moyen']
df = pd.DataFrame(data, columns=columns)
df.to_csv('support_de_vente_data.csv', index=False)

print("Le fichier CSV a été généré avec succès.")
