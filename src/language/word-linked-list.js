class _Node {
    constructor(value, next) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constuctor() {
        this.head = null;
        this.length = 0
    }

    insertFirst(item) {
        this.head = new _Node(item, this.head);
        this.length++
    }

    insertLast(item) {
        // if there is no head, insert first
        if (!this.head) {
            this.insertFirst(item)
        } else {
            let tempNode = this.head;
            while (tempNode.next) {
                tempNode = tempNode.next;
            }
            tempNode.next = new _Node(item, null);
        }
        this.length++
    }

    // find by value
    find(item) {
        // start at head
        let currNode = this.head;
        // if the list is empty
        if (!this.head) {
            return null;
        }
        // check for the item
        while (currNode.value !== item) {
            // return null if end of list and item not found
            if (currNode.next === null) {
                return null;
            } else {
                // keep looking
                currNode = currNode.next;
            }
        }
        // Found item
        return currNode;
    }
    // find by position
    findByPosition(num) {
        let node = this.head;
        for (let i = 0; i < position; i++) {
            node = node.next;
        }
        return node;
    }

    remove(item) {
        if (!this.head) {
            return null;
        }
        // if node to be removed is head, make next node head
        if (this.head.value === item) {
            this.head = this.head.next;
            return;
        }
        // start at head
        let currNode = this.head;
        // track previous
        let previousNode = this.head;

        while ((currNode !== null) && (currNode.value !== item)) {
            previousNode = currNode;
            currNode = currNode.next;
        }
        if (currNode === null) {
            console.log('Item not found');
            return;
        }
        /* set previous node.next to curr node.next to remove 
           references to item thereby removing the item */
        previousNode.next = currNode.next;
        this.length--
    }

    insertBefore(reference, data) {
        let curr = this.head;

        while (curr.next != null) {
            if (curr.next.value == reference) {
                let newNode = new _Node(data);
                newNode.next = curr.next;
                curr.next = newNode;
                return;
            }
            curr = curr.next;
        }
        this.length++
    }

    insertAfter(reference, data) {
        let curr = this.head;

        while (curr.next != null) {
            if (curr.value == reference) {
                let newNode = new _Node(data)
                newNode.next = curr.next;
                curr.next = newNode;
                return;
            }
            curr = curr.next;
        }
        this.length++
    }

    // insertAt(reference, position) {
    //     let curr = this.head;
    //     let count = 1;
    //     console.log('reference ' + reference.translation)
    //     console.log('in insertAt ' + curr.next)
    //     while (count !== position - 1 && curr.next) {
    //         console.log(count)
    //         count++;
    //         curr = curr.next;
    //     }
    //     let newNode = new _Node(reference, null);
    //     newNode.next = curr.next.next
    //     curr.next = newNode;
    //     this.length++
    // }

    insertAt(item, position) {
        if (this.head === null) {
          if (position === 0) {
            this.insertFirst(item);
            return;
          } else {
            this.insertLast(item);
            return;
          }
        }
        let currentPosition = 0;
        let currNode = this.head;
        let prevNode = this.head;
        while (currentPosition !== position && currNode !== null) {
          prevNode = currNode;
          currNode = currNode.next;
          currentPosition++;
        }
        if (currNode === null) {
          this.insertLast(item);
        }
        let tempNode = currNode;
        prevNode.next = new _Node(item, tempNode);
      }
    

    // moveHead() {
    //     let currentNode = this.head;
    //     let nextNode = null;
    //     let prevNode = null;                
    //     while (currentNode) {             
    //         nextNode = currentNode.next;
    //         currentNode.next = prevNode;
    //         prevNode = nextNode;
    //         currentNode = nextNode;
    //     }
    //     this.head = prevNode;        
    // }

    // moveNodeByPosition(position, headNode) {
    //     if (position < 0 || position > this.length) { // verification of the specified position value
    //         return 'Incorrect value of position';
    //     }
    //     let insertValue = headNode.value
    //     this.head = this.head.next
    //     let current = this.head; // the head of the list
    //     let index = 0; // the index for incrementation

    //     while(index < position) {  // goes through each node until the index reaches the position
    //         if (!current.next) {
    //             let movedNode = new _Node(insertValue, null)
    //             return
    //         }
    //         current = current.next; // moves the link to the next node of the current node
    //         index++; // increaments the index
    //     }
    //     current
    //     // return current.value;
    // }

    moveHeadByPosition(position) {
        if (position < 0) { // verification of the specified position value
            return 'Incorrect value of position';
        }
        if (position > this.length) {
            let insertValue = this.head
            this.head = this.head.next
            this.insertLast(insertValue)
        }
        let insertValue = this.head.value
        this.head = this.head.next
        this.insertAt(insertValue, position);
    }

    moveHead(num) {
        let tempHead = this.head;
        this.head = this.head.next;
        this.insertAt(num, tempHead.value)
    }

}

function display(list) {
    let currNode = list.head;
    if (currNode === null) {
        console.log('List is empty');
        return;
    }
    console.log('in display: ' + currNode.value.id)
    return displayRecursiveAdd(currNode, []);
}

function displayRecursiveAdd(node, arr) {
    if (node === null) {
        return [];
    } else {
        return [node.value, ...displayRecursiveAdd(node.next)];
    }
}
// will need to modify if display is to be used outside
module.exports = {LinkedList, display};