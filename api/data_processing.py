import pandas as pd
import os

def load_and_process_data():
    file_path = os.path.join(os.path.dirname(__file__), '..', 'db', 'support_de_vente_data.csv')
    
    df = pd.read_csv(file_path)
    
    df['Date'] = pd.to_datetime(df['Date'])
    
    # Grouper par 'Date' et 'Support de Vente' et calculer le chiffre d'affaires total pour chaque groupe
    grouped_df = df.groupby(['Date', 'Support de Vente']).agg({'ChiffreAffaire': 'sum'}).reset_index()
    
    # Trouver les trois supports de vente avec le plus de chiffre d'affaires pour chaque jour
    top_supports_per_day = grouped_df.sort_values(['Date', 'ChiffreAffaire'], ascending=[True, False]).groupby('Date').head(3)
    
    # Convertir le résultat en dictionnaire
    result = top_supports_per_day.to_dict(orient='records')
    
    return result
