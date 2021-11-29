<template>
<div class="admin">
<div class="heading">
     <div class="circle"></div>
     <h2>Edit/Delete an Question</h2>
   </div>
   <div class="edit">
     <div class="form">
       <input v-model="findQString" placeholder="Search">
       <div class="qSuggestions" v-if="qSuggestions.length > 0">
         <div class="suggestion" v-for="s in qSuggestions" :key="s.id" @click="selectQuestion(s)">{{s.string}}
         </div>
       </div>
     </div>
     <div class="upload" v-if="findQuestion">
       <input v-model="findQuestion.author">
       <p></p>
       <input v-model="findQuestion.date">
       <p></p>
       <textarea v-model="findQuestion.string"></textarea>
     </div>
     <div class="actions" v-if="findQuestion">
       <button @click="deleteQuestion(findQuestion)">Delete</button>
       <button @click="editQuestion(findQuestion)">Edit</button>

     </div>
   </div>
  <div v-if="findQuestion">
 <div class="heading" >
      <div class="circle"></div>
      <h2>Edit/Delete an Answer</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findString" placeholder="Search">
        <div class="suggestions" v-if="suggestions.length > 0">
          <div class="suggestion" v-for="s in suggestions" :key="s.key"  @click="selectItem(s)">
            {{s.string}}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.author">
        <p></p>
        <input v-model="findItem.date">
        <p></p>
        <textarea v-model="findItem.string"></textarea>
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Edit</button>

      </div>
    </div>
    </div>
 </div>

</template>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>

<script>

import axios from 'axios';
export default {
  name: 'Admin',
  data() {
  return {
    author: "",
    qAuthor: "",
    string: "",
    qString: "",
    date: "",
    qDate: "",
    items: [],
    questions: [],
    findAuthor: "",
    findQAuthor: "",
    findDate: "",
    findQDate: "",
    findString: "",
    findQString: "",
    findItem: null,
    findQuestion: null

  }
},
computed: {
    suggestions() {
      let a = [];
      let items = this.items.filter(item => item.string.toLowerCase().startsWith(this.findString.toLowerCase()));
      let num = this.findQuestion.id;
        items.forEach(function(item) {
          if(num !== null && num == item.id){
              a.push(item);
            }
        })

      return a.sort((a, b) => a.string > b.string);
    },
    qSuggestions() {
      let questions = this.questions.filter(question => question.string.toLowerCase().startsWith(this.findQString.toLowerCase()));
      return questions.sort((a, b) => a.string > b.string);
    }
  },
  created() {
  this.getItems();
  this.getQuestions();
},

methods: {

async getItems() {
  try {
    let response = await axios.get("/api/items");
    this.items = response.data;
    this.findQuestion = null;
    return true;
  } catch (error) {
    console.log(error);
  }
},
async getQuestions() {
  try {
    let response = await axios.get("/api/questions");
    this.questions = response.data;
    return true;
  } catch (error) {
    console.log(error);
  }
},
selectItem(item) {
     this.findAuthor = "";
     this.findString = "";
     this.findDate = "";
     this.findItem = item;
   },

selectQuestion(item) {
      this.findQAuthor = "";
      this.findQString = "";
      this.findQDate = "";
      this.isSelected = true;
      this.selectId = item.id;
      this.findQuestion = item;
},

   async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteQuestion(item) {
       try {
         await axios.delete("/api/questions/" + item._id);
         this.findQuestion = null;
         this.getQuestions();
         return true;
       } catch (error) {
         console.log(error);
       }
     },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          author: this.findItem.author,
          date: this.findItem.date,
          string: this.findItem.string,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editQuestion(item) {
      try {
        await axios.put("/api/questions/" + item._id, {
          author: this.findQuestion.author,
          date: this.findQuestion.date,
          string: this.findQuestion.string,
        });
        this.findQuestion = null;
        this.getQuestions();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
}
}
</script>
