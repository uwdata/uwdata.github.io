---
date: 2017-05-02
title: "Regression by Eye"
paper: regression-by-eye
---

William Playfair was an early pioneer of information visualization. Here is one of his charts, a 1786 depiction of the national debt of England:

![](../blog-assets/images/2017-05-02-regression-by-eye-1.webp)
*[William Playfair, The Commercial and Political Atlas, 1786.](https://commons.wikimedia.org/wiki/William_Playfair#/media/File:1786_Playfair_-_20_Chart_of_the_National_Debt_of_England_(from_3e_edition,_1801).jpg)*

The version I’ve posted here is too small to make out many of the finer details. Yet, I’d argue that this chart still communicates a clear message, even without those details: the national debt was at the time getting larger, and this trend was accelerating. Small reversals, such as the debt decreasing from 1762–1775, are not sufficient to counteract the overall impression of a strong, increasing trend. We frequently look at charts like these, and make *visual judgments* about *statistical trends*.

We could have fit an exponential model to this, and visualized the trend line alongside the data, but that might be overkill here. We could just look at the chart, and get a general idea of the trend. In fact, many of the things that make the statistical problem of estimating trends and creating models difficult, like overfitting, selecting a good model space, or detecting and dealing with outliers, can be assisted or even circumvented by our visual estimates. Visual judgments often act as sanity checks that the statistical assumptions we made in our models hold.

However, successfully communicating messages like the increasing national debt requires that our audience reliably estimate trends in charts, and that we can count on people to see what we expect them to see. There is a resulting tension between statistical estimates of trend, which may have many parameters and be complex to communicate to the general audience, and visual estimates of trend, which may have errors and bias.

Our [CHI 2017](https://chi2017.acm.org/) paper [“Regression by Eye: Estimating Trends in Bivariate Visualizations”](http://idl.cs.washington.edu/papers/regression-by-eye) investigates two questions: 1) How well do people visually estimate trends in data? and 2) Does the way we visually encode the data bias these estimates?

As an example, here’s a scatterplot relating the weather outside to the sales of a (fictional) brand of ice cream:

![](../blog-assets/images/2017-05-02-regression-by-eye-2.webp)

From the chart, it seems as though ice cream sales are **strongly and positively correlated** with the temperature outside (although let’s remember that [correlation is not the same as causation](http://www.tylervigen.com/spurious-correlations)!.

Here’s another scatterplot, showing the connection between the murder rate in all 50 US states with respect to the percentage of the population that reports owning guns:

![](../blog-assets/images/2017-05-02-regression-by-eye-3.webp)

Here, it seems there is a **very weak correlation** between these two variables: having gun ownership doesn’t seem very predictive of the murder rate. At the very least, the link between guns and murder seems more complex than the link between sunny days and ice cream.

The question arises: how did you do that? It’s unlikely that you pulled out a calculator and calculated the lines of best fit manually. It’s possible you didn’t consider factors like [Pearson’s *r*](https://en.wikipedia.org/wiki/Pearson_correlation_coefficient), or some other statistical measure of correlation. Rather, you likely made a *visual estimate* of how the points were related. While, [with training](http://guessthecorrelation.com/), we can learn to numerically estimate statistical correlation, we seem to have an ability to make general assessments on how variables are related even without this training. We make what is, at heart, a *statistical* judgment, but we do so *visually*. [Recent](http://www.cs.tufts.edu/~remco/publications/2014/InfoVis2014-JND.pdf) [work](https://idl.cs.washington.edu/files/2015-BeyondWebersLaw-InfoVis.pdf) in visualization research investigates how people visually estimate correlation in data, and finds that the visual encoding of data can have a large impact on our ability to accurately make these estimates.

Our interest is not just in the specific estimation of the degree of correlation, but our ability to visually estimate trends in general. We refer to this overarching ability as **“regression by eye”** — the visual, rather than statistical, estimation of trend and correlation.

The ability to estimate trends in data sets is important, and is frequently an important part of the persuasive content of a graph or chart. Take, for example, the following bar chart of U.S. unemployment:

![](../blog-assets/images/2017-05-02-regression-by-eye-4.webp)

A person might use this chart to show that an economic policy is working because unemployment is *trending downwards*, or alternatively to criticize economic policy because it’s not trending downwards *fast enough*, among other possible rhetorical goals. The fact that, say, unemployment was 4.7% on January 1st, 2016, is mostly relevant only in the context of a larger temporal trend. A person seeking to persuade with this chart is relying on viewers being able to perform regression by eye, and reach conclusions that are broadly similar across the intended audience.

If regression by eye is an important part of the message that we take away from charts, it is helpful to know to what degree our visual estimates **align** with statistical regression: that is, do our estimates match up with what trends we’d see if we really did bring out the calculators? Our eyes and the statistics may disagree! When that happens, how are our judgments **biased** away from traditional lines (or curves) of best fit? 

A standard tool for calculating trend lines in statistics is [linear least squares regression](https://en.wikipedia.org/wiki/Linear_least_squares_(mathematics)). Linear least squares works best on data with one central cluster of points and few outliers. We gave a group of people, many without any statistical training, this kind of data, and a big purple line. The participants could then adjust the purple line with a slider until it matched their best guess at the trend. We compared their guess to the least squares fit as a way of measuring alignment. We also included, for comparison, non-linear fits such as sine waves and parabolas.

![](../blog-assets/images/2017-05-02-regression-by-eye-5.webp)
*The linear (left) trends we examined in our experiments, as well as non-linear quadratic (center) and trigonometric (right) trends. All three types of regression assume a central cluster of points.*

In general, people were close to these standard regression fits. When estimating the slope of a linear fit (in the range [0,1]), the average error was 0.06. For estimating the y-intercept (also in the range [0,1]), the average error was 0.04. Just “eyeballing” the trend was a successful approach for getting estimates pretty close to the statistical standard. What’s more, these estimates were generally *unbiased*: people were neither systematically over- or under-estimating the trend, but erring on both sides of the line. We found equal accuracy both with linear fits like the one below, and for similar estimates in our non-linear models.

![](../blog-assets/images/2017-05-02-regression-by-eye-6.webp)
*The purple line shows the linear line of best fit. The red area shows the average error in estimating the slope of this line.*

However, we expect that other design choices might impact these estimates. We therefore tested situations were we expected to encounter systematic bias — not just errors, but systematic over- or under-estimation in trend.

### Within-the-bar Bias

![](../blog-assets/images/2017-05-02-regression-by-eye-7.webp)
*Because colored bars in bar charts seem to “contain” the values that lie within them, there is a consistent bias where outcomes inside the visual area of the bar (left) are perceived as likelier than values outside of the bar (right).*

[Newman and Scholl](http://perception.yale.edu/papers/12-Newman-Scholl-PBR.pdf) identified a curious property of charts that rely on solid shapes and symbols, like bar charts. These charts create a false visual metaphor of containment. In a bar chart, elements may be perceived as either within a bar or outside a bar. This difference leads to a small but reliable bias in how a general audience interprets charts: *values within the bar are perceived as more likely than values outside of the bar.*

![](../blog-assets/images/2017-05-02-regression-by-eye-8.webp)
*The purple line shows the line of best fit. The red area shows the average bias in estimating the intercept of this line, in area charts. There is a small but significant underestimation in area charts, but not in line charts or scatterplots.*

We found that this bias extends to regression by eye. Area charts are line charts where the area under the line is filled in with a solid color. We found that people habitually underestimate the y-intercept of regression lines in area charts. In other chart types like scatterplots and line charts, where we don’t have filled in areas (and thus remove the metaphor of containment), this bias disappears.

### Outliers and Regression by Eye

![](../blog-assets/images/2017-05-02-regression-by-eye-9.webp)
*The upper purple line shows the “robust” line of best fit — the line of best fit if we ignore the outliers. The lower line shows the “sensitive” line of best fit — the line of best fit if we take the outliers into consideration. The average guess is in red. People were hesitant to consider outliers, but still gave them more weight than the robust line.*

Of course, linear least squares regression is not always the best choice for fitting trends to data. In particular, it is very sensitive to outliers. When there are outliers in a dataset, the statistician must make a choice regarding how extreme values should be allowed to affect the trend. In some cases, outliers may represent bad data, or extreme but unlikely circumstances: if we are interested in the general trend, it might be wise to discount these values. On the other hand, outliers may represent a sudden change in status quo, or a shifting of the trend, in which case they should be considered just as much as any other point in the data. Statisticians must determine whether to fit a robust trend line (where outliers are excluded or down-weighted), or a sensitive trend (where outliers are fully considered).

We tested how regression by eye was affected by the presence of outliers. In general, people select fits that are between the robust and sensitive trends: that is, they weigh outliers significantly less than the sensitive trend line, but still consider them more than a robust (outlier-ignoring) trend line. This is a *misalignment* between statistical models and regression by eye, but it’s difficult to say call this an *incorrect* judgment: what to do about outliers (or even what counts as an outlier) is a difficult problem, and these visual judgments on how to weigh extreme points may be useful for deciding between different methods of statistical regression.

### Conclusion

Many times, when we look at charts, we act as *visual statisticians*, estimating complex statistical phenomena like effect size, trend, and confidence. When we design charts, especially ones where we are intending to persuade people about these kinds of statistical information, we should be mindful of the capabilities of the viewer to infer the kind of statistics we care about. Designers should make sure that they are doing their best to communicate their message in a way that their audience can understand. Similarly, as viewers of visualizations, we should be aware that small changes in the visual design of charts can nudge our judgments: we should be wary of these subtle ways in which charts can influence our perception of the data.

Our study found that, for data consistent with the assumptions of standard regression models, our *visual* estimates about trends are in line with the *statistical* estimates. In these cases, we might trust viewers to make consistent and reliable judgments about trends. However, when there are outliers in the data, people do consider these outliers when making their visual judgments: they are more conservative in their estimates of trend than outlier-sensitive statistical regression. That is, we seem to weight outliers less than the rest of the data we consider when making our estimates. In these situations, designers of visualizations ought to consider whether or not to include annotations (like trend lines, or explicit markings of outlier points) if they want to communicate specific statistical trends in a reliable way. Lastly, designers should be wary of within-the-bar bias: bar charts, area charts, and other visually asymmetric designs may introduce similarly asymmetric visual judgments.

Our work is only an initial exploration of our capacity to act as visual statisticians: much more work remains to explore the limits of our abilities to visually estimate statistical patterns in charts. We also wish to explore a wider range of potential biases that might impact our judgments: not just judgments of statistical values themselves, but also elements like trust, uncertainty, and persuasive power.

*This post was written by Michael Correll, with input from Jeffrey Heer.*
