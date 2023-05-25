import matplotlib.pyplot as plt
import numpy as np

# Create some sample data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create a plot
fig, ax = plt.subplots()

# Plot the data
ax.plot(x, y)

# Define a custom function to format the coordinates
def format_coord(x, y):
    return f'x={x:.2f}, y={y:.2f}'

# Set the custom function as the coordinate formatter
ax.format_coord = format_coord

# Display the plot
plt.show()
