from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import os
app = Flask(__name__)
CORS(app)

@app.route('/api/sale-supports', methods=['GET'])
def get_sales_supports():
    file_path = os.path.join(os.path.dirname(__file__), '..', 'db', 'support_de_vente_data.csv')
    df = pd.read_csv(file_path)
    grouped = df.groupby(['Date', 'Support de Vente']).agg({'ChiffreAffaire': 'sum'}).reset_index()
    top_supports = grouped.groupby('Date').apply(lambda x: x.nlargest(3, 'ChiffreAffaire')).reset_index(drop=True)
    result = top_supports.to_dict(orient='records')
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
