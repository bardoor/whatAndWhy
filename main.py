import json
import io
import base64

from flask import Flask, request, jsonify, render_template
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/task2_hist', methods=['POST'])
def task2_hist():
    data = json.loads(request.data)
    x = data['series']
    k = data['intervals']

    rc = {"xtick.direction": "inout", "ytick.direction": "inout",
          "xtick.major.size": 5, "ytick.major.size": 5, }
    with plt.rc_context(rc):
        fig, ax = plt.subplots()
        ax.hist(x, bins=k)

        ax.spines['left'].set_position('zero')
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_position('zero')
        ax.spines['top'].set_visible(False)
        ax.xaxis.set_ticks_position('bottom')
        ax.yaxis.set_ticks_position('left')

        # make arrows
        ax.plot((1), (0), ls="", marker=">", ms=10, color="k",
                transform=ax.get_yaxis_transform(), clip_on=False)
        ax.text(1.02, 0, "X", transform=ax.get_yaxis_transform(), fontsize=12)

        ax.plot((0), (1), ls="", marker="^", ms=10, color="k",
                transform=ax.get_xaxis_transform(), clip_on=False)
        ax.text(0, 1.02, "Y", transform=ax.get_xaxis_transform(), fontsize=12)

    # Save the chart as an SVG image
    img = io.BytesIO()
    plt.savefig(img, format='svg')
    img.seek(0)
    svg_data = base64.b64encode(img.getvalue()).decode('utf-8')

    return jsonify({'image': svg_data})


@app.route('/task2_hist_rel', methods=['POST'])
def task2_hist_rel():
    data = json.loads(request.data)
    x = np.array(data['series'])
    k = data['intervals']

    rc = {"xtick.direction": "inout", "ytick.direction": "inout",
          "xtick.major.size": 5, "ytick.major.size": 5, }
    with plt.rc_context(rc):
        fig, ax = plt.subplots()
        ax.hist(x, bins=k, weights=np.zeros_like(x) + 1. / x.size)

        ax.spines['left'].set_position('zero')
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_position('zero')
        ax.spines['top'].set_visible(False)
        ax.xaxis.set_ticks_position('bottom')
        ax.yaxis.set_ticks_position('left')

        # make arrows
        ax.plot((1), (0), ls="", marker=">", ms=10, color="k",
                transform=ax.get_yaxis_transform(), clip_on=False)
        ax.text(1.02, 0, "X", transform=ax.get_yaxis_transform(), fontsize=12)

        ax.plot((0), (1), ls="", marker="^", ms=10, color="k",
                transform=ax.get_xaxis_transform(), clip_on=False)
        ax.text(0, 1.02, "Y", transform=ax.get_xaxis_transform(), fontsize=12)

    # Save the chart as an SVG image
    img = io.BytesIO()
    plt.savefig(img, format='svg')
    img.seek(0)
    svg_data = base64.b64encode(img.getvalue()).decode('utf-8')

    return jsonify({'image': svg_data})


@app.route('/task2_polygon', methods=['POST'])
def task2_polygon():
    intervals = json.loads(request.data)['intervals']
    x = np.array(list(map(lambda i: float(i['mean']), intervals)))
    n = np.array(list(map(lambda i: int(i['frequency']), intervals)))

    rc = {"xtick.direction": "inout", "ytick.direction": "inout",
          "xtick.major.size": 5, "ytick.major.size": 5, }
    with plt.rc_context(rc):
        fig, ax = plt.subplots()
        ax.plot(x, n)

        ax.spines['left'].set_position('zero')
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_position('zero')
        ax.spines['top'].set_visible(False)
        ax.xaxis.set_ticks_position('bottom')
        ax.yaxis.set_ticks_position('left')

        # make arrows
        ax.plot((1), (0), ls="", marker=">", ms=10, color="k",
                transform=ax.get_yaxis_transform(), clip_on=False)
        ax.text(1.02, 0, "X", transform=ax.get_yaxis_transform(), fontsize=12)

        ax.plot((0), (1), ls="", marker="^", ms=10, color="k",
                transform=ax.get_xaxis_transform(), clip_on=False)
        ax.text(0, 1.02, "Y", transform=ax.get_xaxis_transform(), fontsize=12)

    # Save the chart as an SVG image
    img = io.BytesIO()
    plt.savefig(img, format='svg')
    img.seek(0)
    svg_data = base64.b64encode(img.getvalue()).decode('utf-8')

    return jsonify({'image': svg_data})


@app.route('/task2_polygon_rel', methods=['POST'])
def task2_polygon_rel():
    intervals = json.loads(request.data)['intervals']
    x = np.array(list(map(lambda i: float(i['mean']), intervals)))
    w = np.array(list(map(lambda i: float(i['relativeFrequency']), intervals)))

    rc = {"xtick.direction": "inout", "ytick.direction": "inout",
          "xtick.major.size": 5, "ytick.major.size": 5, }
    with plt.rc_context(rc):
        fig, ax = plt.subplots()
        ax.plot(x, w)

        ax.spines['left'].set_position('zero')
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_position('zero')
        ax.spines['top'].set_visible(False)
        ax.xaxis.set_ticks_position('bottom')
        ax.yaxis.set_ticks_position('left')

        # make arrows
        ax.plot((1), (0), ls="", marker=">", ms=10, color="k",
                transform=ax.get_yaxis_transform(), clip_on=False)
        ax.text(1.02, 0, "X", transform=ax.get_yaxis_transform(), fontsize=12)

        ax.plot((0), (1), ls="", marker="^", ms=10, color="k",
                transform=ax.get_xaxis_transform(), clip_on=False)
        ax.text(0, 1.02, "Y", transform=ax.get_xaxis_transform(), fontsize=12)

    # Save the chart as an SVG image
    img = io.BytesIO()
    plt.savefig(img, format='svg')
    img.seek(0)
    svg_data = base64.b64encode(img.getvalue()).decode('utf-8')

    return jsonify({'image': svg_data})


@app.route('/task2_emp_dist', methods=['POST'])
def emp_dist():
    intervals = json.loads(request.data)['intervals']
    x = list(map(lambda i: float(i['max']), intervals))
    x.insert(0, intervals[0]['min'])
    x.insert(0, x[0] - 3)
    x.append(x[-1] + 3)

    rel_freqs = list(map(lambda i: float(i['relativeFrequency']), intervals))
    w = [0]
    cur_w = 0
    for rel_f in rel_freqs:
        w.append(cur_w)
        cur_w += rel_f
    w.append(cur_w)
    w.append(cur_w)

    rc = {"xtick.direction": "inout", "ytick.direction": "inout",
          "xtick.major.size": 5, "ytick.major.size": 5, }
    with plt.rc_context(rc):
        fig, ax = plt.subplots()
        plt.plot(x, w)
        # plt.scatter(x, w, marker='o', facecolors='none', edgecolors='b')

        ax.spines['left'].set_position('zero')
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_position('zero')
        ax.spines['top'].set_visible(False)
        ax.xaxis.set_ticks_position('bottom')
        ax.yaxis.set_ticks_position('left')

        # make arrows
        ax.plot((1), (0), ls="", marker=">", ms=10, color="k",
                transform=ax.get_yaxis_transform(), clip_on=False)
        ax.text(1.02, 0, "X", transform=ax.get_yaxis_transform(), fontsize=12)

        ax.plot((0), (1), ls="", marker="^", ms=10, color="k",
                transform=ax.get_xaxis_transform(), clip_on=False)
        ax.text(0, 1.02, "F*(x)", transform=ax.get_xaxis_transform(), fontsize=12)

    # Save the chart as an SVG image
    img = io.BytesIO()
    plt.savefig(img, format='svg')
    img.seek(0)
    svg_data = base64.b64encode(img.getvalue()).decode('utf-8')

    return jsonify({'image': svg_data})


@app.route('/task2_emp_dist_grouped', methods=['POST'])
def emp_dist_grouped():
    intervals = json.loads(request.data)['intervals']

    xes = list(map(lambda i: i['mean'], intervals))
    xes.insert(0, xes[0] - 4)
    xes.append(xes[-1] + 3)

    rel_freqs = list(map(lambda i: float(i['relativeFrequency']), intervals))
    w = [0]
    cur_w = 0
    for rel_f in rel_freqs:
        cur_w += rel_f
        w.append(cur_w)

    plots = []
    for i in range(1, len(xes)):
        plots.append([ (xes[i-1], w[i-1]), (xes[i], w[i-1]) ])

    emp_dist_func = []
    emp_dist_func.append( f"F(x <= {round(xes[1], 2)}) = 0" )
    for i in range(2, len(xes) - 1):
        emp_dist_func.append( f"F({round(xes[i-1], 2)} < x <= {round(xes[i], 2)}) = {round(w[i-1], 2)}" )
    emp_dist_func.append( f"F(x > {round(xes[-2], 2)}) = 1" )
    
    emp_dist_func_html = ''
    for e in emp_dist_func:
        emp_dist_func_html += f"<div>{e}</div>"

    rc = {"xtick.direction": "inout", "ytick.direction": "inout",
          "xtick.major.size": 5, "ytick.major.size": 5, }
    with plt.rc_context(rc):
        fig, ax = plt.subplots()
        
        for plot in plots:
            ax.plot((plot[0][0], plot[1][0]), (plot[0][1], plot[1][1]), color='b')

        for plot in plots[1:]:
            (xi, yi) = plot[0]
            ax.scatter([xi], [yi], marker='o', facecolors='w', edgecolors='b', zorder=2)

        for plot in plots[:-1]:
            (xi, yi) = plot[1]
            ax.scatter([xi], [yi], marker='o', facecolors='b', edgecolors='b')

        ax.spines['left'].set_position('zero')
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_position('zero')
        ax.spines['top'].set_visible(False)
        ax.xaxis.set_ticks_position('bottom')
        ax.yaxis.set_ticks_position('left')

        # make arrows
        ax.plot((1), (0), ls="", marker=">", ms=10, color="k",
                transform=ax.get_yaxis_transform(), clip_on=False)
        ax.text(1.02, 0, "X", transform=ax.get_yaxis_transform(), fontsize=12)

        ax.plot((0), (1), ls="", marker="^", ms=10, color="k",
                transform=ax.get_xaxis_transform(), clip_on=False)
        ax.text(0, 1.02, "F*(x)", transform=ax.get_xaxis_transform(), fontsize=12)

    # Save the chart as an SVG image
    img = io.BytesIO()
    plt.savefig(img, format='svg')
    img.seek(0)
    svg_data = base64.b64encode(img.getvalue()).decode('utf-8')

    return jsonify({'image': svg_data, 'html': emp_dist_func_html})


if __name__ == '__main__':
    app.run(debug=True)
