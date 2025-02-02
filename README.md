## **BookNest (BookShop) + Spring Security**
- This project is a comprehensive full-stack bookshop application designed to facilitate various user interactions, including login functionality, adding books to a cart, viewing detailed book information, placing orders, and updating user profiles.
- The main goal of this project is to implement robust security protocols utilizing Spring Security in combination with JWT Authentication, ensuring that sensitive data and user actions are securely managed throughout the application.
- The application fetches book data from the  **[Google Books API](https://developers.google.com/books)** to display detailed book information for users.

## **Technologies Used** 

| Feature            | Technology Used       | Description                              |
|:-------------------|:----------------------|:-----------------------------------------|
| **Client-Side**    | React.js              | User interface and component design      |
| **Server-Side**    | Spring Boot (Java)    | Business logic and API management        |
| **Authentication** | Spring Security JWT   | Secure user authentication               |
| **Database**       | PostgreSQL            | Stores book and user information         |

## **Authentication & Security**
- JWT authentication is used to secure API endpoints.
- Users must log in to access protected routes.
- Tokens are stored in local storage for session management.

## **API Endpoints**

| **Endpoint**                  | **Method** | **Description**               | 
|:------------------------------|:-----------|:------------------------------|
| **`/api/v1/authLogin`**       | `POST`     | User login                    | 
| **`/api/v1/addClient`**       | `POST`     | User registration             |
| **`/api/v1/update/email`**    | `PUT`      | Update profile                |
| **`/api/v1/getClient/email`** | `GET`      | Get user details              |
| **`/api/v1/postOrder/email`** | `POST`     | Order book                    |

## **Setting Up Vite with React**
> [!IMPORTANT]
Follow these steps to create a new React project using Vite.

#### 1. **Create a Vite Project with React Template**
Run the following command in your terminal to create a new project :

```bash
npm create vite@latest my-react-app
```

#### 2. **Install Dependencies**
Install the project dependencies by running :

```bash
npm install
```
#### 3. **Start the Development Server**
Run the following command to start the development server :

```bash
npm run dev
```
##   **Building a Spring Boot Project**
> [!NOTE]
 You can find all the necessary dependencies,documentation, guides, and resources for Spring Boot at the official website : **[https://start.spring.io/](https://start.spring.io/)**

 #### 1. **Add Dependencies** 
> [!IMPORTANT]
> The following dependencies are **must-add** to your Spring Boot project and should be included in your `pom.xml` file :
```xml
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-test</artifactId>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.security</groupId>
      <artifactId>spring-security-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
```
> [!IMPORTANT]
To implement **JWT Authentication** in your Spring Boot project, add the following dependencies to your `pom.xml` file :
   
```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
</dependency>
```
