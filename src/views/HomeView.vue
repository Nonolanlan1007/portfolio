<template>
    <div id="me">
      <img src="@/assets/logo.png" alt="Logo" class="circle" height="200" width="200">
      <div id="content">
        <h1>Salut ! Moi c'est Nolhan !</h1>
        <h2>Développeur {{ typeValue }} !</h2>
        <div id="reseaux">
          <a href="https://github.com/Nonolanlan1007" target="_blank"><img src="@/assets/icons/github.png" alt="Github" height="50" width="50" class="icon"></a>
          <a href="https://discord.com/users/692374264476860507" target="_blank"><img src="@/assets/icons/discord.png" alt="Discord" height="50" width="50" class="icon"></a>
          <a href="mailto:nolhan.dev@gmail.com" target="_blank"><img src="@/assets/icons/mail.png" alt="Mail" height="50" width="50" class="icon"></a>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "HomeView",
  data: () => {
    return {
      typeValue: "",
      typeStatus: false,
      displayTextArray: ["passionné", "JavaScript", "web", "TypeScript", "fullstack"],
      typingSpeed: 100,
      erasingSpeed: 100,
      newTextDelay: 2000,
      displayTextArrayIndex: 0,
      charIndex: 0,
    };
  },
  methods: {
    typeText() {
      if (this.charIndex < this.displayTextArray[this.displayTextArrayIndex].length) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue += this.displayTextArray[this.displayTextArrayIndex].charAt(
            this.charIndex
        );
        this.charIndex += 1;
        setTimeout(this.typeText, this.typingSpeed);
      } else {
        this.typeStatus = false;
        setTimeout(this.eraseText, this.newTextDelay);
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true;
        this.typeValue = this.displayTextArray[this.displayTextArrayIndex].substring(
            0,
            this.charIndex - 1
        );
        this.charIndex -= 1;
        setTimeout(this.eraseText, this.erasingSpeed);
      } else {
        this.typeStatus = false;
        this.displayTextArrayIndex += 1;
        if (this.displayTextArrayIndex >= this.displayTextArray.length)
          this.displayTextArrayIndex = 0;
        setTimeout(this.typeText, this.typingSpeed + 1000);
      }
    },
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200);
  },
}
</script>

<style scoped>
  #me {
    display: flex;
    margin-left: 100px;
    margin-top: 150px;
    border-radius: 10%;
    padding: 25px;
  }

  #me * {
    margin-left: 25px;
    color: #bbb2b2;
  }

  .circle {
    border-radius: 100%;
  }

  #reseaux {
    display: flex;
  }

  .icon {
    transition: all 0.3s;
  }

  .icon:hover {
    filter: brightness(0.7);
  }
  
  @media all and (max-width: 480px) {
    * {
      align-items: center;
      justify-content: center;
    }

    #me {
      display: block;
      margin-left: 0;
      margin-top: 100px;
      padding: 0;
      align-items: center;
      justify-content: center;
      align-content: center;
    }

    #me * {
      align-content: center;
      align-items: center;
      justify-content: center;
    }

    #reseaux {
      align-items: center;
      justify-content: center;
      margin: 0;
    }

    #reseaux * {
      margin: 15px;
    }
  }
</style>