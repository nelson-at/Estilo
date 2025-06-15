from flask import Flask, request, render_template, redirect, url_for
import json

app = Flask(__name__)

# Route for the main page
@app.route('/')
def index():
    return render_template('index.html')

# Route to handle form submission
@app.route('/submit_product', methods=['POST'])
def submit_product():
    # Get data from the form
    data = request.form.to_dict()

    code = data.get('code')
    del data['code']

    # Update the JSON file
    json_file = 'price_list.json'
    try:
        with open(json_file, 'r') as file:
            existing_data = json.load(file)
    except FileNotFoundError:
        existing_data = {}

    existing_data[code] = data

    with open(json_file, 'w') as file:
        json.dump(existing_data, file, indent=4)

    return redirect(url_for('index'))

@app.route('/generate_receipt', methods=['POST'])
def generate_receipt():
    print("RECEIPT ENDPOINT HIT")
    data = request.form.to_dict(flat=False)

    customer = data["customer"][0]
    is_reseller = data.get('is-reseller', [''])[0] == 'on'
    codes = data["item-name"]
    counts = data["count"]

    json_file = 'price_list.json'

    try:
        with open(json_file, 'r') as file:
            price_list = json.load(file)
    except FileNotFoundError:
        price_list = {}

    with open("bon.json", 'w') as file:
        json.dump(data, file, indent=4)

    products = []
    for i in range(len(codes)):
        code = codes[i].upper()
        if code not in price_list:
            continue
        product = {
            'name': price_list[code]['name'],
            'price': int(price_list[code]['reseller-price'] if is_reseller else price_list[code]['normal-price']),
            'count': int(counts[i]),
        }
        product['total'] = product['price'] * product['count']
        products.append(product)
    
    grand_total = sum(product['total'] for product in products)

    for product in products:
        product['price'] = f"{product['price']:,}"
        product['total'] = f"{product['total']:,}"
    
    grand_total = f"{grand_total:,}"

    return render_template('receipt.html', customer=customer, products=products, grand_total=grand_total, is_reseller=is_reseller)
if __name__ == '__main__':
    app.run(debug=True)