'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);

  /* [DONE] Remove class 'active' from all article links */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get href attribute from clicked link */
  const hrefvalue = clickedElement.getAttribute('href');
  //console.log(hrefvalue);
  /* find the correct article using the selector (value of href attribute) */
  const targetArticle = document.querySelector(hrefvalue);
  //console.log(targetArticle);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  /*const articles = document.querySelectorAll(optArticleSelector).let html = '';
  Error "coś tu jest nie tak" [Solved]*/
  //const articles = document.querySelectorAll(optArticleSelector);  zmiana 7.2
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';

  for (const article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);

    /*  Coś tu jest nie tak [SOLVED]
    /* insert link into titleList
    titleList.insertAdjacentHTML('afterend' , linkHTML);
    */

    /* insert link into html variable */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  //console.log(html);

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  //console.log(links);
}

generateTitleLinks();

const isEmpty = function(obj) {
  for(const key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

const calculateTagsParams = function (tags){
  const extremeNumbers = {};
  let min=1000;
  let max=1;
  for (const prop in tags) {
    if (prop==0){
      min=tags[prop];
      max=tags[prop];
    }
    if (min>tags[prop]){
      min = tags[prop];
    }
    if (max<tags[prop]){
      max = tags[prop];
    }
    extremeNumbers.min = min;
    extremeNumbers.max = max;
  }
  return extremeNumbers;
}

const calculateTagClass = function(count, params){
  console.log(count, params);
  let wynik=0,
  klasa='';
  if(count>=params.min){
    wynik = count/params.max;
      if(wynik<=0.2) klasa='1';
      else if(wynik<=0.4) klasa='2';
      else if(wynik<=0.6) klasa='3';
      else if(wynik<=0.8) klasa='4';
      else if(wynik>0.8) klasa='5';
  }
  console.log(optCloudClassPrefix+klasa);
  return optCloudClassPrefix+klasa;
}

const generateTags = function(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (const article of articles) {
    /* find tags wrapper */
    const tags = article.querySelector(optArticleTagsSelector);
    //console.log(tags);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }
      else {
        allTags[tag]++;
      }
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tags.innerHTML = html;
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  console.log(allTags);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="'+ calculateTagClass(allTags[tag], tagsParams) +'" href="#'+tag+'">'+ tag + '</a>(' + allTags[tag] + ')</li>';
    console.log('tagLinkHTML:', tagLinkHTML);
    //allTagsHTML +=  tag + '(' + allTags[tag] + ') ';
    allTagsHTML += tagLinkHTML;
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  console.log(allTagsHTML);
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
  }

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  //const tag = href.getAttribute('#tag');
  const tag = href.replace('#tag-', '');
  //console.log(tag);
  /* find all tag links with class active */
  //const activeLinks = document.querySelectorAll('.titles a.active');
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]')
  //console.log(activeLinks);
  /* START LOOP: for each active tag link */
    for (let link of activeLinks) {
    /* remove class active */
      link.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(tagLinks);
  /* START LOOP: for each found tag link */
    for (let TagLink of tagLinks) {
    /* add class active */
      clickedElement.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}


function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.post-tags a');
  console.log(links);
  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

const generateAuthors = function(){
  /* find Author */
  /* [NEW] create a new variable allAuthors with an empty array */
  let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (const article1 of articles) {
    /* find Authors wrapper */
    const author = article1.querySelector(optArticleAuthorSelector);
    console.log(author);
  /* START LOOP: for every author: */
    /* make html variable with empty string */
    let html = '';
    /* get tags from post-author attribute */
    const articleAuthor = article1.getAttribute('data-author');
    console.log(articleAuthor);
    /* generate HTML of the link */
    const linkHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
    /* add generated code to html variable */
    html = html + linkHTML;
    /* [NEW] Trochę kombinowałem / check if this link is NOT already in allTags & add author to list*/
    if(isEmpty(allAuthors)){
      allAuthors[articleAuthor] = articleAuthor;
    }
    if(!isEmpty(allAuthors)){
      allAuthors[articleAuthor] = articleAuthor;
      }

    //.for (const key in allAuthors) {
      /*if(allAuthors[key]==articleAuthor){
        count++;
        console.log(count);
      }
      else if(count==0 && i == allAuthors[Object.keys(allAuthors)[Object.keys(allAuthors).length]]){
        allAuthors[key].articleAuthor = articleAuthor;
      }
      ++i;*/

    //}
    /* insert HTML of all the links into the tags wrapper */
    author.innerHTML = html;
    console.log(author);
  /* END LOOP: for every article: */
  }
  console.log(allAuthors);
  /* [NEW] find list of authors in right column */
  const authorsList = document.querySelector('.authors')
  console.log(authorsList);
    /* [NEW] create variable for all links HTML code */
  let allAuthorsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(const author in allAuthors){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    const authorLinkHTML = '<li><a class="" href="#' + author + '">' + allAuthors[author] + '</a></li>';
    console.log('tagLinkHTML:', authorLinkHTML);
    //allTagsHTML +=  tag + '(' + allTags[tag] + ') ';
    allAuthorsHTML += authorLinkHTML;
  }
  /* [NEW] END LOOP: for each tag in allTags: */
  console.log(allAuthorsHTML);
  /*[NEW] add HTML from allTagsHTML to tagList */
  authorsList.innerHTML = allAuthorsHTML;
}
generateAuthors();



const authorClickHandler = function(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(href);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  //console.log(tag);
  /* find all tag links with class active */
  //const activeLinks = document.querySelectorAll('.titles a.active');
  const activeLinks = document.querySelectorAll('a.active[href^="#author-"]')
  //console.log(activeLinks);
  /* START LOOP: for each active tag link */
    for (let link of activeLinks) {
    /* remove class active */
      link.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const authorsLink = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorsLink);
  /* START LOOP: for each found tag link */
    for (let AuthorLink of authorsLink) {
    /* add class active */
      clickedElement.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}

const addClickListenersToAuthors = function(){
  /* find all links to tags */
  const links = document.querySelectorAll('.post-author a');
  console.log(links);
  /* START LOOP: for each link */
  for(let link of links){
    /* add tagClickHandler as event listener for that link */
  link.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();


