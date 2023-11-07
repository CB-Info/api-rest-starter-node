## Installation
### Step 1

Cloner le repo

```bash
git clone [https://github.com/CB-Info/api-rest-starter-node.git](https://github.com/CB-Info/api-rest-starter-node.git)
```

### Step 2

Supprimer le upstream

```bash
git remote rm upstream
```

### Step 3

Vérifier si il est bien delete

```bash
git remote -v
```

### Step 4

Ajouter le nouveau upstream

```bash
git remote add origin [GITHUB_LINK]
```

### Step 5

Vérifier si il est bien setup

```bash
git remote -v
```

### Step 6

Push sur le nouveau repo

```bash
git add .
git commit -m "first commit"
git push -f origin main
```

### Step 7

Installer les dépendances

```bash
npm i
```

### Step 8

Lancer le server

```bash
npm run start
```
