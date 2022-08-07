#!/usr/bin/env python
# coding: utf-8

# In[1]:


import json
import pandas as pd


# In[2]:


i = open("../clean_data/indices.json")


# In[3]:


c = open("../clean_data/cosine_sim.json")


# In[4]:


indices = json.load(i)


# In[5]:


indices_series = pd.Series(indices['indices'])


# In[6]:


cosine_similarity = json.load(c)


# In[7]:


cosine_series = pd.Series(cosine_similarity["cosine_sim"])


# In[20]:


def recommendations(title, cosine_sim=cosine_series):

    # initializing the empty list of recommended movies
    recommended_games = []

    # gettin the index of the movie that matches the title
    idx = indices_series[indices_series == title].index[0]

    # creating a Series with the similarity scores in descending order
    score_series = pd.Series(cosine_sim[idx]).sort_values(ascending=False)

    # getting the indexes of the 10 most similar movies
    top_10_indexes = list(score_series.iloc[1:21].index)

    # populating the list with the titles of the best 10 matching movies
    for i in top_10_indexes:
        recommended_games.append(indices['indices'][i])

    return recommended_games


# In[29]:


recommendations("MONSTER HUNTER: WORLD")


# In[ ]:
