''' Given a list of students, generate a set of N random partnerships such
that no partnerships are repeated.  If the list is of odd length, a new
student is invented whose name is 'solo'.

Scott D. Anderson
Fall 2017
'''

import random

cs204fa17 = ['Anjali',
            'Evelyn',
            'Jamie',
            'Silvie',
            'Kealani',
            'Dana',
            'Mona',
            'Alie',
            'Jee',
            'Haley',
            'Aubrey',
            'Sadie',
            'Maggie',
            'solo']

def make_possibles(students=cs204fa17):
    '''Return a dictionary where the keys are from students and the values
    are the list of *other* students'''
    possibles = {}
    def copy_without(a_list,elt):
        copy = list(a_list)
        copy.remove(elt)
        return copy
    for stu in students:
        possibles[stu] = copy_without(students,stu)
    return possibles

def remove_random_elt(choices):
    choice = random.choice(choices)
    choices.remove(choice)
    return choice

def list_intersection(list1, list2):
    return [ val for val in list1 if val in list2 ]

def make_pairs(num_partnerships=11, students=cs204fa17):
    '''Return num_partnerships possible pairings'''
    poss = make_possibles(students)
    print(poss)

    def pair_all():
        unpaired = list(students)
        def make_pair():
            stu1 = random.choice(unpaired)
            print('chose {stu1} from {unpaired}'.format(stu1=stu1,unpaired=unpaired))
            ## someone unpartnered who they haven't been partnered with
            choices = list_intersection(unpaired, poss[stu1])
            if len(choices) == 0:
                print('out of choices!')
                print('unpaired: ', unpaired)
                print('possible: ', poss[stu1])
                raise Exception
            print('she has possible partners',choices)
            stu2 = random.choice(choices)
            print('chose {stu2} as her partner'.format(stu2=stu2))
            poss[stu1].remove(stu2)
            poss[stu2].remove(stu1)
            unpaired.remove(stu1)
            unpaired.remove(stu2)
            return (stu1,stu2)
        pairs = []
        while len(unpaired) > 0:
            pairs.append(make_pair())
        return pairs
        
    return [ pair_all()
             for i in range(num_partnerships) ]

studs = [ ch for ch in 'abcdefghijklm' ]

if __name__ == '__main__':
    make_pairs()
