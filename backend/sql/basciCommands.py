import sqlite3

class Sqlite:
    def __init__(self,dbName,tbName):
        self.title=dbName;
        self.conn=sqlite3.connect(self.title)
        self.tbName=tbName
        self.field=[]
        self.fieldTypes=[]

    """ Expands given value to tuples """"
    def tupleStruct(self,datas):
        join=" ("
        for index in range(len(datas)-1):
            join+=datas[index]+','
        join+=datas[index+1]+") "
        return join

    def ExecuteStatement(self,statement):
        print(self.conn.execute(statement))
    
    def CommitStatement(self):
        self.conn.commit()

    def GroupStatement(self,headers,values,id=0):
        #travel distance
        length=range(0,len(values))
         
        #check whether valid contents are passed
        if len(headers) != len(values):
            return false
        """     Insert / create statement       """ 
        if(id==0):
            self.statement="INSERT INTO {}".format(self.tbName)
            self.statement+=self.tupleStruct(headers)+"values"+self.tupleStruct(values)
        else:
            self.statement="CREATE TABLE {}".format(self.tbName)
            statement=[]
            for index in length:
                self.field.append(headers[index])
                self.fieldTypes.append(values[index])
                statement.append(headers[index]+' '+values[index])
            self.statement+=self.tupleStruct(statement)

        self.ExecuteStatement(self.statement)
        self.CommitStatement()

conn = Sqlite("sample",'user')
conn.GroupStatement( ['name','email','id'] , ['varchar(100) NOT NULL','varchar(100)','int'],1)

# Integrity Error
# conn.GroupStatement( ['email','id'] , ["'proraviki@gmail.com'",'22'])
conn.GroupStatement( ['name','email','id'] , ["'ravikiran'","'proraviki@gmail.com'",'22'])

"""
    To make Text Plain 'int'   ==> int
    To make Text String 
                            "'username'"  ==> 'username'
                            '"username"'  ==> "username"
        Other ways to refer any tutorial


    operations to be update
        UPDATE
        ALTER
        CHANGE table name

    operations to ReadTable
        Group/Indivdual
            Range
                    ASC
                    DESC
                    COND
"""
    




