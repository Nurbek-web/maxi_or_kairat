import gradio as gr
from fastai.vision.all import *
from fastbook import *
from fastai.vision.widgets import *
import gradio as gr
from pathlib import Path
import pathlib
plt = platform.system()
if plt == 'Windows': pathlib.WindowsPath = pathlib.PosixPath

learn_inf = load_learner('export.pkl')

categories = ("maxi", "kairat")

def classify_image(img):
    pred,idx,probs = learn_inf.predict(img)
    return dict(zip(categories, map(float, probs)))

examples = ["maxi.jpg", "kairat.jpeg"]
intf = gr.Interface(fn=classify_image, inputs=gr.inputs.Image(shape=(192, 192)), outputs=gr.outputs.Label(), examples=examples)
intf.launch(inline=False,share=True)
