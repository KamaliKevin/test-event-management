# IMPORTANT: Before testing
<p><b>Be aware this project uses online libraries, so make sure you either have stable Internet connection 
or download the libraries and put them inside the project folder. Libraries that were used for this project 
are the following:</b></p>
<ul>
    <li>Bootstrap</li>
    <li>JQuery</li>
    <li>FullCalendar</li>
    <li>Moment JS</li>
</ul>
<p><b>Try to respect that order as well, as some libraries depend on other ones</b></p>

<p>1. Create a database with a table. This table should have the columns and data types as it follows:</p>
<ul>
    <li><b>id</b>: INT AUTOINCREMENT PRIMARY KEY</li>
    <li><b>title</b>: VARCHAR(255) NOT NULL</li>
    <li><b>description</b>: TEXT</li>
    <li><b>start</b>: DATETIME NOT NULL</li>
    <li><b>end</b>: DATETIME NOT NULL</li>
    <li><b>backgroundColor</b>: VARCHAR(7)</li>
    <li><b>textColor</b>: VARCHAR(7)</li>
</ul>
<p><b>Please, do respect specially the "backgroundColor" and "textColor" data types, as they are supposed 
to be color hexcodes</b></p>

<p>2. After creating the table, populate it with some dummy data</p>

<p>3. Open the project folder, and now go to <b>config.php</b> and change any necessary data there <b>to make
the database work and be connected (this project uses PDO library for the database connection)</b></p>

# About this
<p>This is an event calendar that needs a database to work. It is flexible, since it allows to <b>drag and drop events
on other dates and even extend them</b>. You can <b>add, edit and remove events</b> as well clicking on them.</p> 

<p>When adding events, be aware
<b>all fields are required except the "Description" field.</b> You only need to <b>click on a day to add an event</b>,
and so, <b>clicking on a created event allows you to either edit it or delete it</b></p>

<p>
Initial configuration: <b>config.php</b><br>
View: <b>index.php</b><br>
Controller: <b>events_data.php</b><br>
Database connection: <b>db_connection.php</b><br>
Custom interactions: <b>script.js</b><br>
Custom styles: <b>style.css</b>
</p>

<p><b>Please, check WELL the files if you are going to reorganize them and put them into another file structure!</b></p>

# License
This project uses the MIT License. You can find more information inside the "LICENSE.md" file or in the following link:
<a href="https://opensource.org/license/MIT/" target="_blank">MIT License</a>