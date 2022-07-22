import pandas as pd
from rake_nltk import Rake
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

# reading the csv file and grabbing the important data
df = pd.read_csv('./Steam Database/steam_games.csv')

df = df[['name', 'genre', 'developer',
         'popular_tags', 'url']]


df['popular_tags'] = df['popular_tags'].map(
    lambda x: str(x).lower().split(','))

df['genre'] = df['genre'].map(lambda x: str(x).lower().split(','))

df['developer'] = df['developer'].map(lambda x: str(x).lower().split(','))


# merging together first and last name for each actor and director, so it's considered as one word
# and there is no mix up between people sharing a first name
for index, row in df.iterrows():
    row['popular_tags'] = [x.lower().replace(' ', '')
                           for x in row['popular_tags']]

    row['genre'] = [x.lower().replace(' ', '')
                    for x in row['genre']]

    row['developer'] = [x.lower().replace(' ', '')
                        for x in row['developer']]


# creating a new column with ranked keywords from "popular tags"


# df['key_words'] = ''

# for index, row in df.iterrows():
#     popular_tags = row['popular_tags']

#     r = Rake()

#     r.extract_keywords_from_text(str(popular_tags))

#     key_words_dict_scores = r.get_word_degrees()

#     row['key_words'] = list(key_words_dict_scores.keys())


df.set_index('name', inplace=True)


df['bag_of_words'] = ''
columns = df.columns
for index, row in df.iterrows():
    words = ''
    for col in columns:
        # if col != 'Director':
        #     words = words + ' '.join(row[col]) + ' '
        # else:
        if col == 'url':
            break
        words = words + ' '.join(row[col]) + ' '
    row['bag_of_words'] = words

df.drop(columns=[col for col in df.columns if col !=
                 'bag_of_words'], inplace=True)


with pd.option_context('display.max_rows', 10,
                       'display.max_columns', None,
                       'display.precision', 3,
                       ):
    print(df)

count = CountVectorizer()
count_matrix = count.fit_transform(df['bag_of_words'])

# creating a Series for the movie titles so they are associated to an ordered numerical
# list I will use later to match the indexes
indices = pd.Series(df.index)
print(indices[:10])

cosine_sim = cosine_similarity(count_matrix, count_matrix)
