'use strict';
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

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


const generateTags = function(){
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
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tags.innerHTML = html;
  /* END LOOP: for every article: */
  }
}

generateTags();




function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('.list a');
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
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (const article1 of articles) {
    /* find Authors wrapper */
    const author = article1.querySelectorAll(optArticleAuthorSelector);
    console.log(author);
  /* START LOOP: for every author: */
    /* make html variable with empty string */
    let html = '';
    /* get tags from post-author attribute */
    const articleAuthor = article1.getAttribute('data-author');
    /* generate HTML of the link */
    const linkHTML = '<a href="' + articleAuthor + '">' + articleAuthor + '</a>';
    /* add generated code to html variable */
    html = html + linkHTML;
    /* insert HTML of all the links into the tags wrapper */
    author.innerHTML = html;
    console.log(author);
  /* END LOOP: for every article: */
  }
}
generateAuthors();

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
  const tag = href.replace('#tag-', '');
  //console.log(tag);
  /* find all tag links with class active */
  //const activeLinks = document.querySelectorAll('.titles a.active');
  const activeLinks = document.querySelector('a.active[href^="by-"]')
  //console.log(activeLinks);
  /* START LOOP: for each active tag link */
    for (let link of activeLinks) {
    /* remove class active */
      link.classList.remove('active');
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const AuthorsLink = document.querySelector('a[href="' + href + '"]');
  console.log(AuthorsLink);
  /* START LOOP: for each found tag link */
    for (let AuthorLink of AuthorsLink) {
    /* add class active */
      clickedElement.classList.add('active');
  /* END LOOP: for each found tag link */
    }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(optArticleAuthorSelector);
}
