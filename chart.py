import io
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from flask import Flask, send_file, Response

app = Flask(__name__)

@app.route("/")
def plot_chart():
    # Generate data
    x = np.linspace(-10, 10, 100)
    y = x**2

    # Create the plot
    sns.set(style="darkgrid")
    plt.figure(figsize=(10, 6))
    sns.lineplot(x=x, y=y)
    plt.xlabel("x")
    plt.ylabel("y = x^2")

    # Save the plot to a BytesIO object
    img = io.BytesIO()
    plt.savefig(img, format="png")
    img.seek(0)

    # Return the image as a response
    return send_file(img, mimetype="image/png")

if __name__ == "__main__":
    app.run(debug=True)
