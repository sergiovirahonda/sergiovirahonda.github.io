---
layout: post
title:  "Predicting depression & anxiety on Twitter with ML"
author: sergio
categories: [ NLP,Python,Machine Learning,Topic Modeling]
tags: []
image: assets/images/depression-anxiety/twitter.jpg
rating: 5
comments: false
---

Hi there. I hope you're doing well. Today I'm going to walk you through this fascinating project about Natural Language Processing but let me explain myself and talk about its context. I've been reading a lot about how hard the COVID-19's lockdown is hitting the people out there. We all know the isolation affects people different ways, but the most frequents are depression and anxiety which is an expected outcome - the natural responses to confinement are precisely these, and most of the people don't even know it. It's been a hard time, people are afraid of uncertainty, of losing their jobs as many people have already done. Simply the conditions are met for a major emotional imbalance in the world's population

Experts recommend to stay away from social media because it accelerates the depression process, and who is depressed already will be even more, however people expressions on it are a key instrument to determine how a population is feeling. Most of the social media active people express how they feel in tweets, facebook posts, comments and even Instagram captions. So, starting from there, **can we determine if the depression and anxiety have increased during the lockdown implementing Machine Learning?** It's an ambitious project, but will do my best to explain myself as clearly as possible.

This post will cover several steps, but a 10000 feet overview would be:

* **Topic Modeling** - where we'll be looking for two labels: 1 - Depression & anxiety comments, 0 - Other
* **Topic Classification** - Once we have the labels, we train a model to learn these topics and start predicting them in other datasets.

To achieve both tasks, we'll go through:

* **Data collection** - Getting data from different sources to accomplish the main objective.
* **Data cleaning** - We'll have to take all the data which is already in different formats and clean it up to then be able to use it.
* **Natural Language Processing for Topic Modeling** - We'll need to transform the text data into a type that can be interpreted by ML models.
* **Unsupervised Learning tasks for Topic Modeling** - This is crucial, because most of the data we can find out there is unlabeled, so we first need to identify patterns in it.
* **Supervised Learning tasks for Topic Classification** - Once the data is labeled, we'll go through several ML algorithms to finally select the one that delivers the best perfomance.
* **Predict depression and anxiety** in unseen tweets before and after lockdown
* **Results' charting and conclusions**

In addition and before moving on, let me talk about the datasets used in this project:

* The Depression & Anxiety Facebook comments dataset was obtained at https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6111060/ - It contains several comments where depressive and anxious terms are used. There's already a research about it on that website. For this opportunity, we'll use it only to model the topics - Depression/Anxiety & others.

* The COVID-19 tweets were acquired by myself implementing tweets scrapping. The dataset is composed by several tweets distribuited in the first week of the US lockdown - Don't worry, I'll explain later how I did to scrap them.

Alright, let's move on and deep dive into this adventure.

# Data exploration for Topic Modeling

This was no more than exploring the Facebook comments dataset to know how it's composed. Esentially it contains about 7000 entries, all of them in the depression/anxiety context but it doesn't mean they are depressive or anxious comments. They can reference people talking about depression in a medical context, informative content, or just really depressive people expressing themselves. There aren't empty entries btw.

# Data Preprocessing for Topic Modeling

Well, It's the first step when taking the NLP route, isn't it? It's all about normalizing the text data, what would be removing the background noise in sound engineering. It's all done with the purpose of getting quality data that can be later adapted to be interpreted by ML models.

These are the steps performed in this stage, and the most important ones that should be implemented in all NLP projects:

* Remove URLs - because they don't add any value to the text (it would depend on the project).
* Remove emails - same as before, they don't add any value more than noise.
* Lowercase all text - this with the purpose of getting normalized data. Otherwise we would have several word variations.
* Remove punctuation signs - they can add word variations that our models can understand as different ones.
* Remove stop words - This is crucial, essentially we're looking to remove common words such as I, you, but, ok, don't, and so on. They won't add any value and only force the models to learn meaningless vocabulary.
* Lemmatize text - this is the most important part. We need to find the root words, this with the intention of avoiding several variations. Smiling would be transformed in its root form *smile*, laughing into *laugh* and so on. Now do you understand how important is it?

All these tasks were achieved implementing NLTK and Gensim libraries which contain fantastic methods to process text data but the most important thing about them is the good quality documentation you can find out there on the Internet.

# Data Vectorization for Topic Modeling

Alright, I'm gonna suppose you have zero knowledge about text data processing for Machine Learning so let's put first things first. Machine Learning models, supervised or unsupervised, generally are not able to understand text data so its need to be turned into numerical features, which is the ML language; usually they take as input the numbers, perform some actions and return a prediction or any other expected ML outcome (could be also clusters/labels) - said this, how do we turn text into numbers?

We implement Count Vectorizer and TFIDF transformer from Scikit-Learn library to achieve this task. Let me explain myself, I'll quote my favorite ML book: 

All this starts implementing something called bag-of-words: When using this representation, we discard most of the structure of the input text, like chapters, paragraphs, sentences, and formatting, and only count how often each word appears in each text in the corpus. Computing the bag-of-words representation for a corpus of documents consists of the following three steps:

* **Tokenization.** Split each document into the words that appear in it (called tokens), for example by splitting them on whitespace and punctuation.
* **Vocabulary building.** Collect a vocabulary of all words that appear in any of the documents, and number them (say, in alphabetical order).
* **Encoding**. For each document, count how often each of the words in the vocabulary appear in this document.

<cite>— Introduction to Machine Learning with Python, Andreas C. Müller & Sarah Guido.</cite>

The bag-of-words representation is implemented in *CountVectorizer* , which is a transformer widely used and popular in this industry.

Alright, what about *TFIDF*? another approach is to rescale features by how informative we expect them to be. One of the most common ways to do this is using the term frequency–inverse document frequency (tf–idf) method. The intuition of this method is to give high weight to any term that appears often in a particular document, but not in many documents in the corpus. If a word appears often in a particular document, but not in very many documents, it is likely to be very descriptive of the content of that document. Scikit-learn implements the tf–idf method in two classes: TfidfTransformer, which takes in the sparse matrix output produced by CountVectorizer and transforms it, and TfidfVectorizer, which takes in the text data and does both the bag-of-words feature extraction and the tf–idf transformation. We'll be using CountVectorizer together with TFIDF transformer in this project stage.

In order to be figurative, this is how an input looks like:

```python
'So, when you ask what the two illnesses are...theyre similar in that they tend to have moodiness involved, impulsivity and self-damaging behaviors for compensatory measures. Otherwise, theyre not really that similar, but they do seem to "like" one another and often show up in the same person...making their lives chaotic, difficult, dysfunctional, and intense. So, if your friend is concerned that they may have one (or both) of these illnesses, they should not be ashamed. Its definitely not their fault. They should, instead, get help from a professional...and INSIST that they are treated appropriately with the correct types of therapy and medication.'
```

And this is how the output would like like:

```python
'ask', 'illness', 'be', 'similar', 'tend', 'moodiness', 'involved', 'impulsivity', 'self', 'damaging', 'behavior', 'compensatory', 'measure', 'otherwise', 'be', 'really', 'similar', 'seem', 'one', 'often', 'show', 'person', 'make', 'live', 'chaotic', 'difficult', 'dysfunctional', 'intense', 'friend', 'concern', 'may', 'illness', 'ashamed', 'definitely', 'fault', 'instead', 'get', 'help', 'professional', 'insist', 'treat', 'appropriately', 'correct', 'type', 'therapy', 'medication'
```

Did you notice any difference?

# Topic Modeling through Clustering techniques.

We went the comparison of two unsupervised machine learning models: **LDA** and **NMF**; one of them very popular, the other one not too much. 

*LDA* (latent Dirichlet allocation), in NLP, is a form of unsupervised learning that views documents as bags of words (ie order does not matter). LDA works by first making a key assumption: the way a document was generated was by picking a set of topics and then for each topic picking a set of words. Now you may be asking “ok so how does it find topics?” Well the answer is simple: it reverse engineers this process. To do this it does the following for each document m:

* Assume there are k topics across all of the documents.
* Distribute these k topics across document m (this distribution is known as α and can be symmetric or asymmetric, more on this later) by assigning each word a topic.
* For each word w in document m, assume its topic is wrong but every other word is assigned the correct topic.
* Probabilistically assign word w a topic based on two things: what topics are in document m and how many times word w has been assigned a particular topic across all of the documents (this distribution is called β)
* Repeat this process a number of times for each document and you’re done!

In the other hand, **NMF** (Non-negative matrix factorization), is an unsupervised technique that factors high-dimensional vectors into a  low-dimensionality representation. Similar to Principal component analysis (PCA), NMF takes advantage of the fact that the vectors are non-negative. By factoring them into the lower-dimensional form, NMF forces the coefficients to also be non-negative.
Using the original matrix (A), NMF will give you two matrices (W and H). W is the topics it found and H is the coefficients (weights) for those topics. In other words, A is articles by words (original), H is articles by topics and W is topics by words. To explain myself better I would need to get into mathematic demonstrations, so let's keep things simple for now.

Another important thing to highlight: We've used Scikit-Learn models and not Gensim because the last one takes forever to train the models and unfortunately cannot be GPU accelerated. Said this, let's continue.

We've implemented both models to compare the topics' quality they reach, that way we can decide which one does better the job to finally select it.

This is what both models achieved when modeling the topics:

```python
NMF
Topic 0:
be, help, go, take, feel, get, know, time, med, make, try, thing, day, work, would, people, need, have, think, life, good, year, want, say, find
Topic 1:
anxiety, depression, depression anxiety, bipolar, anxiety depression, take, bipolar depression anxiety, bipolar depression, help anxiety, disorder, severe, help, work, anxiety attack, also, attack, severe anxiety, suffer, bipolar anxiety, symptom, med, anxiety disorder, high, anxiety take, bad

LDA
Topic 0:
be, feel, go, know, day, people, get, time, think, say, life, want, thing, have, make, would, struggle, even, love, try, can, understand, tell, good, way
Topic 1:
anxiety, take, help, med, work, depression, also, bipolar, get, need, find, medication, try, doctor, year, may, make, well, go, use, disorder, sleep, good, time, would
```

As you can see, NMF delivers better term mixtures for the topic 1 which is the one that cares us the most. Actually, if you read carefully the topic 1 you'll find out that it's what we were looking for since the beginning. Just because NMF is able to work with ngrams is the reason why we get better results and delivers depressive/anxious actual mixtures and not just terms about it.

Looking closer, this are some samples of entries labeled as depressive/anxious tweets:

```python
Yes, I've been seeing psychiatrists for nearly 30 years.  First just depression, then cyclothymia, then bipolar and anxiety, then BPD.

I'm a  *itch 24/7 and I am not on medication because I have no fking medical insurance for my bipolar, depression and anxiety so I have too deal with it myself and people around me, I can't stand who I am but I feel stuck like you, and hopeless

My wife left me about 9 months ago after a 8 year relationship. decided to jist pack up and leave on Christmas without warning because she couldn't deal with my anxiety and depression. It still hurts me but it will get better, you have to believe.  Hang in there.

Hurtful question..n alot of insensitive comments. Its not like we can help it.  So on top of hereditary mental health issues...i have to be forever single?  That works wonders on depression n anxiety. Thanks. :'(

I am in a relationship with my same sex partner which suffers from bipolar. Myself with depression and anxiety disorder. It's extremely tedious 90% of the time with the unpredictability of his emotions and my anxiety having a blast off that.

Well, my wife is married to one (I suffer with depression, anxiety, and probably some other stuff), so I'd be hypocritical to say no...

Yes because I suffer from depression/anxiety disorder. If I dated anyone "normal" (whatever the hell that is) I'd be bored.

My anxiety fuels my agitation and rage and that fuels my anxiety. It doesn't end. Just be very honest.

I think I'll die twenty years before I should :(

That's the bloody problem is finding the right meds. I'm on one for bi polar and one for social anxiety and the socal anxiety ones are like bloody sex pills to mee
```

As you can see, NMF delivers better results because it's more specific and really determines depressive/anxious comments meanwhile LDA labels all entries that contain depression/anxiety related words and it makes the labeling more general. That's the reason why I chose NMF.

Now the dataset is properly labeled; the label 1 - Depression & Anxiety- is pretty coherent. Even when label 0 still contains text with relevant words, if you deep dive into it you'll notice the entries don't seem to be comments related to Depression & Anxiety. Said that, let's move on: It's time now to classify tweets.

# Data preprocessing for Topic Classification

This is basically apply the same pipeline that we used to get the bag-of-words that we got previously. All these tasks to get an understandable dataset that can be then fed to our classifier.

# Model Selection for the Topic Classifier

Alright, we've been doing some topic modeling to finally reach this point. Essentially what did is to train several vectorizers and supervised ML models to get a very accurate result to then predict tweets' topics from a dataset that we'll be using later on this project. Btw, we'll skip Random Forest model because it's known to overfit the text data and deliver poor metrics.

Long story short: we've gone through SGD Classifier, SVC, XGBoost classifier and finally Logistic Regression classifier, which reached the best accuracy. We also compared confusion matrices and the Logistic one was the one that best performed by far. To get in context, let me show it to you:

![Confusion Matrix](/assets/images/depression-anxiety/confusion.png)

Not bad, huh? The simplest model was the one that delivered one of the best metrics. We kept this model because it fitted the data very quick and for our purposes this one behaves more than good. We can deal with the FPs and FNs misclassified by this predictor. 

# Depressive/anxious tweets import and exploration

Alright, I'm about to walk you through to a dataset that I've acquired implementing OMGOT script - It's essentilly a Python code to get tweets without the need of using the Twitter API. Why did I do it this way? Because in order to use the Twitter API you need a developer account and you all know how complex is to get it approved. However, the mentioned script allows you to get whatever the tweets you want, in the location you want and with the keywords that you want.

The dataset is made up of several CSV files, each one containing all available tweets related to depression and anxiety topics. We've limited them because would get complex to measure our model in a dataset that contains spread content. Also, the dataset contains tweets from 03/14 to 03/27 - one week before and after the lockdown started along US. Let's see what patterns we can find.

to query all these tweets, I wrote a very simple bash script. This is a sample:

```python
#!/bin/bash#
massiveScrap() {

python GetOldTweets3.py --querysearch "depression" --maxtweets 1000 --output 0314_1.csv  --since 2020-03-14 --until 2020-03-15 --near "38.50,-98.00" --within 2000km
...
```

I extracted publicly available tweets from all US. In total, I've got about 25k tweets and uploaded to the notebook so I could predict depressive/anxious tweets from there.

# Predicting depression & anxiety - Finally

We're reaching the end of this project. Finally bust not less important, it's time to predict depression and anxiety on the new dataset. To achieve this, we went again through text preprocessing to then start predicting. 

Once we performed the massive prediction, we've got some that look very well, but also very sad! It's the demonstration that there are many people out there having serious issues. Obviously there are some tweets that are related to other type of depression, but most of them are about actual depressive and anxious people. Let's get more info about this.

# Important findings

I just put the data together to plot some curves about the actual number of depressive/anxious tweets against the whole tweets dataset, to determine if exists any pattern where we can infer some conclusions.

I**MPORTANT:** The OMGOT script downloaded all available tweets with the specification given. We'll be basing our research on a unbalanced and very irregular dataset, just FYI. In addition, it's just to measure how well our model performs, the rest of the research is just informative and not with science purposes.

How does look the depression/anxiety curve per day for both weeks? Is there any pattern here? Any less depressive day compared to the others? Btw, the vertical line indicates the start of the lockdown in US.

![Depression curve](/assets/images/depression-anxiety/depression_curve.png)

**There are a few things to extract from the above's chart**:

*We would need to get more data and also for more days, but some premature thoughts would be*:

* The predictions follow the trend of the dataset in most of the days, which is made up of tweets that contain keywords related to depression and anxiety but not are not necessarily depressive/anxious tweets.
* Even when the dataset has a peak on 03/20, the predictions don't follow the trend this day. That only means our model is filtering depressive/anxious tweets properly. This day people could be tweeting about "Great Depression" which we know was a world TT but is not related to actual depression, just economy depression.
* Weekends are less depressive - which makes sense. Important researches have confirmed that the less depressive day for the americans is Saturday.
* We cannot make an affirmation, but looks like the lockdown has decreased the anxiety and depression on americans, at least on the first week of lockdown. That could make sense, people would be at home with their families and not having to deal with outside people - which generates high volumes of anxiety for introvert individuals.
* Week days are the ones that generate more anxiety and depression on americans, with peak on wednesdays.
* Let's get some data about time to find out more trends.

Looking at the tweets-per-hour chart:

![Hours curve](/assets/images/depression-anxiety/hours.png)

**There are a few things we can extract from the above's chart as well:**

*As mentioned before, these are just assumptions and we would need to get more data about this, but some premature conclusions would be*:

* The depression/anxiety curves reach the bottom at 9:00 am, for obvious reasons like that's the time were there are less depressive/anxious tweets but also could be related factors like people is facing the job duties - most of them would be pretty busy.
* The curves reach the highest point at 17:00. This could be the time people unsatisfied with their jobs begin expressing their sentiment through Twitter.
* 23:00 is also a very important peak: It could demonstrate how people express their their anxiety and depression before going to bed. We all know that's a very dramatic moment for depressive people.
* To get a bigger panorama, more data from more days would need to be acquired.

# Conclusions

Alright, we've reached the end of this project. There are several things to highlight and also to close though.

First of all I would say the models trained in here reached very good results even when the datasets were unbalanced. Also, even when they are pretty simple, could be implemented to identify several other topics such as violent, racist or abussive tweets, all of this with the goal of detect dangerous behaviors in the population or measure how hard an event impacts on it. We all know some companies are implementing this kind of models and apps to research about future employees before proceeding with the selection process.

Another important factor to highlight is that, prematurely saying, the first week of the lockdown decreased the depression and anxiety on the US population. We would need to research deeper, with more data for more days to know if actually the lockdown decresed depressive behavior. Also we identified important patterns such as weekens are less depressive days, and the most depressive day of the week is around Tuesday, just like most of the researches state. In addition, we've identified some important patterns during the day, such as the most depressive hour is 17:00 and 23:00, and the less depressive hour is 09:00 - we would need to research in more depth to know the reasons.

When talking about how this research can be improved, I would say more data needs to be acquired: More days before and after the lockdown and compare it with other countries, just to know if there are more important patterns. Another good approach would be to include some other keywords to the dataset, that way the classifier has a wider vocabulary. Finally, to normalize the results, I would get the same number of tweets for every day and every hour, that way we can get much more accurate data just basing us on the predictions and not on the tweets fluctuation.

Btw, you can find the whole notebook available in my [GitHub repo](https://github.com/sergiovirahonda/)

Hope you've enjoyed the read. See you around!