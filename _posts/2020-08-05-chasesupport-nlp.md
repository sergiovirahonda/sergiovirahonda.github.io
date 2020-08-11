---
layout: post
title:  "ChaseSupport Tweets Exploration & Analysis"
author: sergio
categories: [ NLP,Python,Data Science,Topic Modeling]
tags: []
image: assets/images/chasesupport/customer-support.jpg
rating: 4
comments: false
---

Hi there! It's nice you see you around. In this post I'm going to walk you through a very frequent business case. You all know that Customer Support service is a very important link in the customer satisfaction process and management is very keen when measuring the agents, all this because of the importance they have for a company, doesn't matter its nature. A product/service can be fantastic, but if the client needs some guidance/support afterwards and it's not as good as the product, it will automatically become a terrible experience.

The main issue with the Twitter Customer Support is that there's no way to measure the agents' performance, because the clients don't provide feedback at all. So, how could the interactions experience be measured? And in the case the business would want to implement a chatbot or simply automated responses for some specific topics, how could this be achieved? I'll explain how Natural Language Processing and Topic Modeling could boost a business need of this nature. Let's get hands on.

# The dataset

I found this dataset publicly available at [Kaggle](https://www.kaggle.com/thoughtvector/customer-support-on-twitter) and contains tweets for several companies around the world. Basically all of them are Customer Support interactions (company and customer ends) and vary depending on the nature of the business. You will find there tweets from Apple Support, AmazonHelp, among others. I focused on ChaseSupport tweets because they involve a very crucial topic for all of us: **Money**. There's were you could get most unsatisfied people. It contains around 8700 tweets with their respective responses from the client's side. 

# The tweets preprocessing

Alright, we've got a bunch of tweets, most of them without any order, containing URLs, hashtags, mentions, etc. We don't know which tweet from Customer Support has been responded and a response to what tweet? So essentially what I did was to put them together: The customer tweet asking for assistance together with its response from ChaseSupport team. The next stage was to get both timestamps which are really crucial to get important metrics such as time-to-response, most busy days and hours. In addition, exists the need to clean them all and remove all undesired characters/expressions that would only add noise to our analysis. To achieve this, I've implemented some functions written by myself but also used lemmatizing from NLTK library which is known to achieve fantastic results. 

Between the tasks that I had to implement, I can mention standarizing the sentences by making them all lowercase, removing stopwords which are known to add tons of noise to the text explorations, remove punctuation to finally reach the lemmatizing process. Most of these tasks were done implementing NLTK library which is one of the bests for Natural Language Processing tasks.


# Premature findings

With the help of some histograms I found some curious patterns, but let my explain myself how they would be useful: imagine three floors of a building full of agents, all of them replying tweets to the Chase customers. How could management distribute their shifts along the day to don't leave the service without coverage but also to avoid delays in the support service? Is there any pattern that management can take advantage of and distrubute the agents' shifts?

## Demand distributions

This is how the interactions per hour histogram looks like:

![hist per hour](/assets/images/chasesupport/hours.png)

The peaks of the day happen at 15 and 21 hours, but in general the most busy frame is since 15 to 21 hours though. Those would be the hours when most of the workforce must be deployed in order to reduce the time-to-response and keep a good customer-satisfaction. Also, team lunch-breaks can be taken from 11 to 14 without the risk of degrade the service. What about days along the week?:


![hist per week](/assets/images/chasesupport/days-week.png)

The most busy days are Tuesday and Wednesday, as you could see above. Management would need to have more agents these days to avoid delay in the service. Let's see what about days of the month:

![hist per week](/assets/images/chasesupport/days-month.png)

Even when it looks to have a normal distribution, you can see the peak of interactions occurs at the end of the month, what is expected - It's pay day. What about time-related metrics? How long does it take to get a response from ChaseSupport on twitter?

## ChaseSupport time-to-response

This is a very crucial metric. You all know customer support teams need to reduce the time they take to reply the inquiries as much as possible. Otherwise the clients' satisfaction will be reduced exponentially. Let's explore the findings:

* The average time-to-response is **4 hours 52 minutes** - that's A LOT, it's an eternity when talking about money issues, don't you think?
* The most delayed response took more than **4 days**. I researched about why it took so long and it was related to a complaint - not good, at all. Other related findings: Several complaints took this long to be replied. For this particular dataset (which is from 2018), ChaseSupport looked to have some issues when attending complaints.

# Tweets' vocabulary

This is very important. What are the Chase clients talking about? What are the most frequent words used? This exploration's objective is to determine how the clients are expressing about the service and what are the topics more discussed. To be more figurative, let's see at the words' cloud (take your time to read all words, you'll find out more than you think you'll do):

![hist per week](/assets/images/chasesupport/wordscloud.png)

Well, there are obvious words we knew we'll find, right? Bank, account, credit card, that's obvious. Did you notice the words f-ck, sh-t, wtf and damn and their sizes? That says a lot about customer satisfaction, doesn't it? In the other hand, you can get some other findings - People ask a lot about 'Ultimate reward', 'Mobile App', 'credit card', 'debir card' and so on. It's very interesting, because you could use these topics to then reorganize the teams in 'skills' or specialists, just like most of help desk teams are divided into products. Let's deep dive into this idea:

# Topic Modeling

What if the business is requiring to get the top topics discussed on Twitter? Maybe to segment teams in subdivisions or train some specialists. The best way would be to implement some sort of unsupervised learning algorithms and see what they would return, based on the tweets universe.

## Tweets vectorization

Alright, we now know that our models won't accept more than numeric values. This is the reason why we need to convert all tweets into this kind of values, and the best way is through a vectorizer such as CountVectorizer or TFIDF Vectorizer. I implemented TFIDF Vectorizer which is known by deliver good results. Let's introduce some theory about it:

One of the best approaches when working with text data is to rescale features by how informative we expect them to be. One of the most common ways to do this is using the term frequency–inverse document frequency (tf–idf) method. The intuition of this method is to give high weight to any term that appears often in a particular document, but not in many documents in the corpus. If a word appears often in a particular document, but not in very many documents, it is likely to be very descriptive of the content of that document.

Once we have our text transformed as numeric features, it's time to apply Clustering techniques:

## Topic Modeling through Clustering

We won't go too deep in this stage because the project does not require it, but in a real world scenario we would need to implement some research about, for example, find the best number of clusters for our model; but for this particular example, the business is the one that should define the number of clusters depending on the model output. Sometimes it makes more sense this way.

We've implemented NMF model because it's known to deliver good results and also train in short period of tme. Let's see what patterns it found in the data.

```python
NMF
Topic 0:
customer service, bad customer service, bad customer, best customer service, best customer, customer service rep, service rep, terrible customer service, terrible customer, call customer service, call customer, great customer service, great customer, customer service suck, service suck, poor customer service, poor customer, horrible customer service, horrible customer, customer service help
Topic 1:
credit card, new credit card, new credit, pay credit card, pay credit, credit card account, card account, credit card bill, card bill, credit card number, card number, apply credit, apply credit card, credit card application, card application, credit card fraud, card credit, card fraud, card credit card, credit history
Topic 2:
debit card, new debit card, new debit, lose debit, lose debit card, replacement debit, replacement debit card, cyber monday, debit card hack, card hack, debit card number, debit card cancel, card cancel, order new, card u200d, card pretty, card wait, order new debit, card number, card asap
Topic 3:
bank account, new bank account, close bank account, new bank, close bank, bank account hack, open bank account, open bank, account hack, account doesn, bank account doesn, love bank, put money, dont bank, bank account fuck, money steal, business bank, account cancel, man bank, account could
Topic 4:
ultimate reward, ultimate reward site, reward site, ultimate reward website, reward website, ultimate reward portal, reward portal, ultimate reward travel, reward travel, hi ultimate, hi ultimate reward, ultimate reward dashboard, reward dashboard, email address, idea ultimate reward, idea ultimate, ultimate reward work, reward work, reward site down, ultimate reward available
Topic 5:
fuck bank, bad fuck, bad fuck bank, bank atm, bank smh, bank gonna, oh fuck, burn branch, stupid fuck bank, stupid fuck, bank seriously, money account, already fuck, already help, there fuck, bank tallahassee, bank ask, account already, customer claim, pay fuck
Topic 6:
close account, wait close account, wait close, help close, help close account, lose customer, run around, account yall, account asap, close account phone, six month, account u200d, account phone, money close account, money close, close account cause, account cause, suck close account, suck close, account isn
Topic 7:
sapphire reserve, reserve card, sapphire reserve card, priority pas, trip delay, sapphire reserve customer, reserve customer, 115873 credit, right now, renew sapphire, renew sapphire reserve, start work, card instead, book last, finally sapphire, fee totally, reserve already, freedom sapphire reserve, annual fee, freedom sapphire
```

## Topics' Interpretation

Let's give those outputs a good shape:

* Topic 0: all tweets that contain those keywords must be attended by a team that receives **Customer Support's Complaints** - Which attends upset clients that have had bad experiences with the support service, just like a help desk team would provide attention to "reopened" tickets.
* Topic 1: all tweets in this category would need to be assisted by **Credit Card inquiries** team, and possibly the support would be continued by DM, to avoid any kind of fraud afterwards.
* Topic 2: all tweets that fit this category must be assisted by **Debit Card inquires** team and same as before, continue the process through DM.
* Topic 3: Ultimate Reward and other Customer Benefits or something like that, and this team would assist all inquiries related to the benefits the bank provides to its customers.
* Topic 4: This topic could be interpreted as a negative one, and could be attended by **Customer Retention** team.
* Topic 5: This is also a very sensitive topic, which could be attended by **Customer Retention** team or directly a team that handles the **Banking Services's Complaints**.
* Topic 6: Sapphire credit cards are provided to top clients, so definitely this topic would be assisted by **VIP Support** team.
* Topic 7: This is very clear, and would be interpreted as **Account operations**.

# Conclusions

Even when the data is not labeled, we can see above what are the words and topics most discussed in the customer support service at Twitter. Applying the same methods, the business could extract the core subjects to get insights about their service and therefore, deploy some solutions - for example, a link with a how-to guide about how to self-resolve most recurrent issues - or how to know if a tweet is crucial to be answered ASAP or not. In addition, if going further would be required, the next step would be to label this data and build a predictor with a similar vectorizer to then create a chatbot. The solutions will depend on the business' needs.

In general terms and as shown before, the ChaseSupport tweets demostrate a very bad customer support, with very high time-to-response rates and if you take a close look to the words' cloud you will find recurrent terminology that would indicate a negative sentiment in the clients' interactions.

In the case the business would need to increase the customer service NPS (or any other similar parameter), the 10.000-feet-above best way would be to reduce the time-to-response is to segment the support service into micro-teams, each one focusing on different topics, that way all pain points are covered.

Finally, to achieve better results, maybe LDA must be implemented or even any Deep Learning model but again, all this in a real business scenario. Just to clarify, this post is not a critic about Chase support, It's just an example scenario.

The whole notebook is available in my [GitHub repo](https://github.com/sergiovirahonda/Chase-Support-Tweets-NLP/blob/master/chasesupport-tweets-analysis-nlp-modeling.ipynb)

Hope you've enjoyed the read. See you around!

