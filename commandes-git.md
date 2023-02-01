# Les branches Git 

## Quelques commandes utiles en vrac :

-   `ls` -->  __lister les fichiers__ disponibles du répertoire courant
-   `cat nom_ficher.md` --> __voir le contenu__ d'un fichier Markdown

pour voir uniquement les __lignes du fichier contenant une chaîne de caractères__ :
-   `cat nom_ficher.md | grep 'Chaine recherchée'` : recherche sensible à la casse (majuscule/minuscule)
-   `cat nom_ficher.md | grep -i 'Chaine recherchée'` : recherche insensible à la casse

-   `git branch -a` --> __voir les différentes branches__
-   `git checkout nom_de_la_branche` --> __changer__ de branche
-   `git log` --> __lister les commits__ effectués sur la branche courante (on peut quitter cette navigation avec la touche `Q` )
-  `git checkout -b nomDeBranche` --> __créer une nouvelle branche__ à  partir de la courante, et se positionner dessus.
-  `git branch -d nomDeBranche` --> __supprimer__ une branche

**Pour lister les commits dont le message de commit contient une chaine précise :**

-   `git log --grep 'chaine recherchée'`--> __lister les commits__ dont le message de commit __contient une chaine précise__ 
-   `git log --author 'auteur recherché'` --> __lister__ les commits d'un __auteur__ précis


-   `git checkout <hash-commit>`--> __accéder aux fichiers de ce commit__
__ex :__
`git checkout 5657d3372ca31aadb3da1d99c798833718493b04`
on peut aussi juste écrire les premiers caractères de l'identifiant du commit :
`git checkout 5657d3`

⚠️ une fois qu'on se place sur un commit donné, un `git log` listera uniquement les commits effectués avant ce commit => par exemple, si une branche possède 10 commits, qu'on se place sur le 6ème commit, `git log` listera uniquement les commits 1 à 6

-  `git checkout nom_de_la_branche` --> revenir au __commit le plus récent__

-  `git merge nomDeBranche` --> __fusionner__ une branche avec la branche courante

- Pour __push une nouvelle branche :__ `git push --set-upstream origin newBranchName`
