#!/usr/bin/env python
# coding: utf-8

# In[4]:


from cmath import cos
import pandas as pd
from rake_nltk import Rake
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import numpy as np
import json
from json import JSONEncoder


# In[5]:


df = pd.read_csv('../SteamDatabase/steam_games_10000.csv')


# In[6]:


df = df[['name', 'genre', 'developer',
         'popular_tags', 'url']]


# In[7]:


df


# In[10]:


df.name.replace({r'[^\x00-\x7F]+': ''}, regex=True, inplace=True)
df.developer.replace({r'[^\x00-\x7F]+': ''}, regex=True, inplace=True)


# In[11]:


df


# In[12]:


df['popular_tags'] = df['popular_tags'].map(
    lambda x: str(x).lower().split(','))

df['genre'] = df['genre'].map(lambda x: str(x).lower().split(','))

df['developer'] = df['developer'].map(lambda x: str(x).lower().split(','))


# In[13]:


for index, row in df.iterrows():
    row['popular_tags'] = [x.lower().replace(' ', '')
                           for x in row['popular_tags']]

    row['genre'] = [x.lower().replace(' ', '')
                    for x in row['genre']]

    row['developer'] = [x.lower().replace(' ', '')
                        for x in row['developer']]


# In[14]:


df.set_index('name', inplace=True)


# In[15]:


df['bag_of_words'] = ''
columns = df.columns
for index, row in df.iterrows():
    words = ''
    for col in columns:

        if col == 'url':
            break
        words = words + ' '.join(row[col]) + ' '
    row['bag_of_words'] = words

df.drop(columns=[col for col in df.columns if col !=
                 'bag_of_words'], inplace=True)


# In[16]:


df


# In[17]:


count = CountVectorizer()
count_matrix = count.fit_transform(df['bag_of_words'])


# In[18]:


cosine_sim_raw = cosine_similarity(count_matrix, count_matrix)


# In[19]:


cosine_sim_raw


# In[20]:


cosine_sim = cosine_sim_raw.tolist()


# In[21]:


cosine_sim


# In[23]:


indices_raw = pd.Series(df.index)


# In[24]:


indices = indices_raw.tolist()


# In[25]:


cosine_sim_json = {"cosine_sim": cosine_sim}


# In[26]:


indices_json = {"indices": indices}


# In[27]:


with open("../clean_data/cosine_sim.json", "w") as write_file:
    json.dump(cosine_sim_json, write_file)


# In[28]:


with open("../clean_data/indices.json", "w") as write_file:
    json.dump(indices_json, write_file)


# In[ ]:
