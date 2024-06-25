import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import dash
import dash_core_components as dcc
import dash_html_components as html

# Charger les données à partir du fichier CSV
df = pd.read_csv('data.csv')

# Agréger les données par support de vente
grouped = df.groupby('Support de Vente').agg({
    'ChiffreAffaire': 'sum',
    'NbCommandes': 'sum',
    'Panier Moyen': 'mean'
}).reset_index()

# Calculer le top support de vente
top_support = df['Support de Vente'].value_counts().reset_index()
top_support.columns = ['Support de Vente', 'Count']

# Chiffre d'affaires par support de vente
fig1 = px.bar(grouped, x='Support de Vente', y='ChiffreAffaire', title='Chiffre d\'Affaires par Support de Vente')

# Nombre de commandes par support de vente
fig2 = px.bar(grouped, x='Support de Vente', y='NbCommandes', title='Nombre de Commandes par Support de Vente')

# Panier moyen par support de vente
fig3 = px.bar(grouped, x='Support de Vente', y='Panier Moyen', title='Panier Moyen par Support de Vente')

# Top supports de vente
fig4 = px.bar(top_support, x='Support de Vente', y='Count', title='Top Supports de Vente')

# Initialiser l'application Dash
app = dash.Dash(__name__)

# Définir la mise en page
app.layout = html.Div([
    dcc.Graph(figure=fig1),
    dcc.Graph(figure=fig2),
    dcc.Graph(figure=fig3),
    dcc.Graph(figure=fig4)
])

# Exécuter l'application
if __name__ == '__main__':
    app.run_server(debug=True)
